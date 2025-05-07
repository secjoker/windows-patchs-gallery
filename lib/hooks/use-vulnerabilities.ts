"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { fetchVulnerabilities, Vulnerability as ApiVulnerability, SeverityLevel } from "@/lib/api"
import { useLocalStorage } from "./use-local-storage"

// 扩展 API 的 Vulnerability 类型
export interface Vulnerability extends ApiVulnerability {
  cveNumber: string // 对应 id
  cveTitle: string // 对应 title
  impact: string // 影响描述
  customerActionRequired: boolean // 是否需要客户操作
  productAffected: string[] // 受影响产品
  kbNumbers: string[] // KB 编号
}

interface VulnerabilityFilters {
  dateRange?: { from: Date; to: Date }
  severity?: Record<string, boolean>
  searchTerm?: string
  exploited?: boolean
  customerActionRequired?: boolean
}

interface UseVulnerabilitiesOptions {
  initialFilters?: VulnerabilityFilters
  cacheKey?: string
  cacheExpiry?: number // 缓存有效期（毫秒）
}

interface UseVulnerabilitiesReturn {
  vulnerabilities: Vulnerability[]
  loading: boolean
  error: string | null
  filters: VulnerabilityFilters
  setFilters: (filters: Partial<VulnerabilityFilters>) => void
  refreshData: () => Promise<void>
  filteredData: Vulnerability[]
  stats: {
    total: number
    critical: number
    important: number
    moderate: number
    low: number
    exploited: number
    actionRequired: number
  }
}

// 转换 API 返回的数据到扩展类型
const transformApiData = (apiData: ApiVulnerability[]): Vulnerability[] => {
  return apiData.map(item => ({
    ...item,
    cveNumber: item.id,
    cveTitle: item.title,
    impact: item.description.split('。')[0],
    customerActionRequired: Math.random() > 0.5, // 随机设置，应从 API 中获取
    productAffected: item.affectedProducts || [],
    kbNumbers: item.kbNumbers || []
  }));
};

export function useVulnerabilities(options: UseVulnerabilitiesOptions = {}): UseVulnerabilitiesReturn {
  const {
    initialFilters = {
      dateRange: {
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 过去30天
        to: new Date()
      },
      severity: {
        critical: true,
        important: true,
        moderate: true,
        low: true
      }
    },
    cacheKey = "vulnerability-data",
    cacheExpiry = 3600000 // 1小时缓存
  } = options

  // 状态管理
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFiltersState] = useState<VulnerabilityFilters>(initialFilters)

  // 本地缓存
  const [cachedData, setCachedData] = useLocalStorage<{
    data: Vulnerability[]
    timestamp: number
  }>(cacheKey, { data: [], timestamp: 0 })

  // 漏洞数据状态
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>(
    cachedData?.data || []
  )

  // 检查缓存是否过期
  const isCacheValid = useCallback(() => {
    return (
      cachedData?.data?.length > 0 &&
      cachedData?.timestamp &&
      Date.now() - cachedData.timestamp < cacheExpiry
    )
  }, [cachedData, cacheExpiry])

  // 设置过滤器
  const setFilters = useCallback(
    (newFilters: Partial<VulnerabilityFilters>) => {
      setFiltersState((prev) => ({ ...prev, ...newFilters }))
    },
    []
  )

  // 获取数据
  const fetchData = useCallback(async (forceFetch = false) => {
    // 如果缓存有效且不是强制刷新，则使用缓存数据
    if (isCacheValid() && !forceFetch) {
      setVulnerabilities(cachedData.data)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { dateRange } = filters
      
      if (!dateRange?.from || !dateRange?.to) {
        throw new Error("请选择有效的日期范围")
      }

      const apiData = await fetchVulnerabilities(dateRange.from, dateRange.to)
      const transformedData = transformApiData(apiData)
      
      // 更新状态和缓存
      setVulnerabilities(transformedData)
      setCachedData({
        data: transformedData,
        timestamp: Date.now()
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "获取数据失败，请重试"
      console.error("获取漏洞数据出错:", err)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [filters, isCacheValid, cachedData, setCachedData])

  // 强制刷新数据
  const refreshData = useCallback(async () => {
    await fetchData(true)
  }, [fetchData])

  // 初始加载数据
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // 根据过滤器筛选数据
  const filteredData = useMemo(() => {
    if (!vulnerabilities.length) return []

    return vulnerabilities.filter((vuln) => {
      // 按严重性筛选
      if (filters.severity) {
        const enabledSeverities = Object.entries(filters.severity)
          .filter(([_, enabled]) => enabled)
          .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1)) as SeverityLevel[]

        if (enabledSeverities.length > 0 && !enabledSeverities.includes(vuln.severity)) {
          return false
        }
      }

      // 按搜索词筛选
      if (filters.searchTerm) {
        const searchRegex = new RegExp(filters.searchTerm, "i")
        const matchesSearch = 
          searchRegex.test(vuln.cveNumber) || 
          searchRegex.test(vuln.cveTitle) || 
          searchRegex.test(vuln.impact) ||
          vuln.productAffected.some(product => searchRegex.test(product)) ||
          vuln.kbNumbers.some(kb => searchRegex.test(kb))

        if (!matchesSearch) return false
      }

      // 按已被利用状态筛选
      if (filters.exploited !== undefined && vuln.exploited !== (filters.exploited ? "Yes" : "No")) {
        return false
      }

      // 按需要客户行动状态筛选
      if (filters.customerActionRequired !== undefined && vuln.customerActionRequired !== filters.customerActionRequired) {
        return false
      }

      return true
    })
  }, [vulnerabilities, filters])

  // 计算统计数据
  const stats = useMemo(() => {
    return {
      total: vulnerabilities.length,
      critical: vulnerabilities.filter(v => v.severity === "Critical").length,
      important: vulnerabilities.filter(v => v.severity === "Important").length,
      moderate: vulnerabilities.filter(v => v.severity === "Moderate").length,
      low: vulnerabilities.filter(v => v.severity === "Low").length,
      exploited: vulnerabilities.filter(v => v.exploited === "Yes").length,
      actionRequired: vulnerabilities.filter(v => v.customerActionRequired).length
    }
  }, [vulnerabilities])

  return {
    vulnerabilities,
    loading,
    error,
    filters,
    setFilters,
    refreshData,
    filteredData,
    stats
  }
} 