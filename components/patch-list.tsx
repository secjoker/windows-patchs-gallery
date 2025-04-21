"use client"

import { useState, useEffect, useCallback } from "react"
import { VulnerabilityCard } from "./vulnerability-card"
import { Button } from "./ui/button"
import { fetchVulnerabilities, Vulnerability as ApiVulnerability } from "@/lib/api"
import { addDays } from "date-fns"
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react"

interface PatchListProps {
  data?: Array<{
    cveNumber: string
    cveTitle: string
    releaseDate: string
    severity: "Critical" | "Important" | "Moderate" | "Low"
    baseScore: number
    impact: string
    exploited: boolean
    customerActionRequired: boolean
    kbNumbers: string[]
    productAffected: string[]
  }>
}

export function PatchList({ data = [] }: PatchListProps) {
  const [currentTab, setCurrentTab] = useState<"all" | "critical" | "important" | "moderate" | "low" | "exploited">("all")
  const [vulnerabilities, setVulnerabilities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // 分页相关
  const ITEMS_PER_PAGE = 9
  const [currentPage, setCurrentPage] = useState(1)
  
  // 加载模拟数据
  const loadMockData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      // 获取最近90天的数据
      const endDate = new Date()
      const startDate = addDays(endDate, -90)
      
      console.log("加载漏洞数据: 从", startDate, "到", endDate);
      const mockData = await fetchVulnerabilities(startDate, endDate)
      console.log("获取到漏洞数据:", mockData.length);
      
      if (mockData.length === 0) {
        setError("未找到漏洞数据，请尝试调整过滤条件");
        setLoading(false);
        return;
      }
      
      // 转换数据格式以匹配组件要求
      const formattedData = mockData.map(item => ({
        cveNumber: item.id,
        cveTitle: item.title,
        releaseDate: item.publishedDate,
        severity: item.severity,
        baseScore: item.cvssScore,
        impact: item.description.split('。')[0],
        exploited: item.exploited === "Yes",
        customerActionRequired: Math.random() > 0.5, // 随机设置
        kbNumbers: item.kbNumbers || [],
        productAffected: item.affectedProducts || []
      }))
      
      console.log("格式化后的数据:", formattedData.length);
      setVulnerabilities(formattedData)
    } catch (error) {
      console.error("加载模拟数据失败:", error)
      setError("数据加载失败，请刷新页面重试")
    } finally {
      setLoading(false)
    }
  }, [])
  
  // 如果没有传入数据，则自动加载模拟数据
  useEffect(() => {
    if (data.length > 0) {
      console.log("使用传入的数据:", data.length);
      setVulnerabilities(data)
      setLoading(false)
    } else {
      loadMockData()
    }
  }, [data, loadMockData])
  
  // 当标签切换时重置页码
  useEffect(() => {
    setCurrentPage(1)
  }, [currentTab])
  
  // 根据当前标签过滤数据
  const filteredData = vulnerabilities.filter(item => {
    switch (currentTab) {
      case "critical":
        return item.severity === "Critical"
      case "important":
        return item.severity === "Important"
      case "moderate":
        return item.severity === "Moderate"
      case "low":
        return item.severity === "Low"
      case "exploited":
        return item.exploited
      default:
        return true
    }
  })
  
  // 计算总页数
  const totalPages = Math.max(1, Math.ceil(filteredData.length / ITEMS_PER_PAGE))
  
  // 确保当前页码在有效范围内
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);
  
  // 获取当前页的数据
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )
  
  // 处理页面变更
  const handlePageChange = (page: number) => {
    // 确保页面在有效范围内
    if (page < 1) page = 1
    if (page > totalPages) page = totalPages
    setCurrentPage(page)
    
    // 滚动到列表顶部
    document.getElementById('patch-list-top')?.scrollIntoView({ behavior: 'smooth' })
  }
  
  // 重新加载数据
  const handleReload = () => {
    loadMockData();
  }
  
  // 获取统计数据
  const stats = {
    total: vulnerabilities.length,
    critical: vulnerabilities.filter(v => v.severity === "Critical").length,
    important: vulnerabilities.filter(v => v.severity === "Important").length,
    moderate: vulnerabilities.filter(v => v.severity === "Moderate").length,
    low: vulnerabilities.filter(v => v.severity === "Low").length,
    exploited: vulnerabilities.filter(v => v.exploited).length
  }
  
  return (
    <div id="patch-list-top">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">安全漏洞列表</h2>
        <div className="flex items-center text-sm text-gray-500">
          {!loading && (
            <button 
              onClick={handleReload} 
              className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
              title="重新加载数据"
            >
              <RotateCw size={16} className="mr-1" />
              刷新
            </button>
          )}
        </div>
      </div>
      
      {/* 标签切换 */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-6">
            <button
              onClick={() => setCurrentTab("all")}
              className={`inline-block py-3 px-4 ${
                currentTab === "all"
                  ? "border-b-2 border-primary font-medium text-primary"
                  : "text-gray-500 dark:text-gray-400 hover:text-primary transition"
              }`}
            >
              全部 {stats.total > 0 && <span className="ml-1 text-xs opacity-70">({stats.total})</span>}
            </button>
          </li>
          <li className="mr-6">
            <button
              onClick={() => setCurrentTab("critical")}
              className={`inline-block py-3 px-4 ${
                currentTab === "critical"
                  ? "border-b-2 border-primary font-medium text-primary"
                  : "text-gray-500 dark:text-gray-400 hover:text-primary transition"
              }`}
            >
              严重 {stats.critical > 0 && <span className="ml-1 text-xs opacity-70">({stats.critical})</span>}
            </button>
          </li>
          <li className="mr-6">
            <button
              onClick={() => setCurrentTab("important")}
              className={`inline-block py-3 px-4 ${
                currentTab === "important"
                  ? "border-b-2 border-primary font-medium text-primary"
                  : "text-gray-500 dark:text-gray-400 hover:text-primary transition"
              }`}
            >
              重要 {stats.important > 0 && <span className="ml-1 text-xs opacity-70">({stats.important})</span>}
            </button>
          </li>
          <li className="mr-6">
            <button
              onClick={() => setCurrentTab("moderate")}
              className={`inline-block py-3 px-4 ${
                currentTab === "moderate"
                  ? "border-b-2 border-primary font-medium text-primary"
                  : "text-gray-500 dark:text-gray-400 hover:text-primary transition"
              }`}
            >
              中等 {stats.moderate > 0 && <span className="ml-1 text-xs opacity-70">({stats.moderate})</span>}
            </button>
          </li>
          <li className="mr-6">
            <button
              onClick={() => setCurrentTab("low")}
              className={`inline-block py-3 px-4 ${
                currentTab === "low"
                  ? "border-b-2 border-primary font-medium text-primary"
                  : "text-gray-500 dark:text-gray-400 hover:text-primary transition"
              }`}
            >
              低危 {stats.low > 0 && <span className="ml-1 text-xs opacity-70">({stats.low})</span>}
            </button>
          </li>
          <li className="mr-6">
            <button
              onClick={() => setCurrentTab("exploited")}
              className={`inline-block py-3 px-4 ${
                currentTab === "exploited"
                  ? "border-b-2 border-primary font-medium text-primary"
                  : "text-gray-500 dark:text-gray-400 hover:text-primary transition"
              }`}
            >
              已被利用 {stats.exploited > 0 && <span className="ml-1 text-xs opacity-70">({stats.exploited})</span>}
            </button>
          </li>
        </ul>
      </div>
      
      {/* 加载状态 */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          <span className="ml-3 text-lg">加载中...</span>
        </div>
      )}
      
      {/* 错误提示 */}
      {error && !loading && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-200">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* 筛选后没有数据 */}
      {!loading && !error && filteredData.length === 0 && vulnerabilities.length > 0 && (
        <div className="text-center py-16 bg-card rounded-lg shadow">
          <div className="text-5xl mb-4 text-gray-400">
            <i className="fas fa-search"></i>
          </div>
          <h3 className="text-xl font-semibold mb-2">未找到匹配的漏洞信息</h3>
          <p className="text-gray-500 mb-4">当前过滤条件下没有符合要求的漏洞数据</p>
          <Button
            variant="outline"
            onClick={() => setCurrentTab("all")}
          >
            查看所有漏洞
          </Button>
        </div>
      )}
      
      {/* 补丁列表 */}
      {!loading && !error && filteredData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentData.map((vulnerability) => (
              <VulnerabilityCard
                key={vulnerability.cveNumber}
                vulnerability={vulnerability}
                onClick={() => {
                  console.log("查看详情:", vulnerability.cveNumber)
                }}
              />
            ))}
          </div>
          
          {/* 分页控制 */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 mb-8 space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                上一页
              </Button>
              
              <div className="flex items-center mx-4">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // 计算要显示的页码
                  let pageToShow = i + 1;
                  
                  if (totalPages > 5) {
                    if (currentPage > 3) {
                      // 如果当前页大于3，显示当前页附近的页码
                      pageToShow = Math.min(currentPage - 2 + i, totalPages);
                      
                      // 确保最后一个按钮总是最后一页
                      if (i === 4) pageToShow = totalPages;
                      
                      // 确保第一个按钮总是第一页
                      if (i === 0) pageToShow = 1;
                    }
                  }
                  
                  return (
                    <Button
                      key={i}
                      variant={currentPage === pageToShow ? "default" : "outline"}
                      size="sm"
                      className="mx-1 w-9 h-9"
                      onClick={() => handlePageChange(pageToShow)}
                    >
                      {pageToShow}
                    </Button>
                  );
                })}
                
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="mx-1">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mx-1 w-9 h-9"
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                下一页
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
          
          {/* 当前页码状态 */}
          {totalPages > 1 && (
            <div className="text-center text-sm text-gray-500 mb-4">
              显示第 {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} 条，共 {filteredData.length} 条结果
            </div>
          )}
        </>
      ) : (
        !loading && !error && filteredData.length === 0 && vulnerabilities.length === 0 && (
          <div className="text-center py-16 bg-card rounded-lg shadow">
            <div className="text-5xl mb-4 text-gray-400">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">暂无漏洞数据</h3>
            <p className="text-gray-500 mb-4">当前没有可用的漏洞信息</p>
            <Button
              variant="outline"
              onClick={handleReload}
            >
              <RotateCw size={16} className="mr-2" />
              重新加载
            </Button>
          </div>
        )
      )}
    </div>
  )
} 