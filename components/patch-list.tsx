"use client"

import { useState, useEffect } from "react"
import { VulnerabilityCard } from "./vulnerability-card"
import { Button } from "./ui/button"
import { fetchVulnerabilities, Vulnerability as ApiVulnerability } from "@/lib/api"
import { addDays } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
  const [currentTab, setCurrentTab] = useState<"all" | "critical" | "important" | "exploited">("all")
  const [vulnerabilities, setVulnerabilities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // 分页相关
  const ITEMS_PER_PAGE = 9
  const [currentPage, setCurrentPage] = useState(1)
  
  // 如果没有传入数据，则自动加载模拟数据
  useEffect(() => {
    if (data.length > 0) {
      setVulnerabilities(data)
      setLoading(false)
    } else {
      loadMockData()
    }
  }, [data])
  
  // 加载模拟数据
  const loadMockData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // 获取最近90天的数据
      const endDate = new Date()
      const startDate = addDays(endDate, -90)
      
      const mockData = await fetchVulnerabilities(startDate, endDate)
      
      // 转换数据格式以匹配组件要求
      const formattedData = mockData.map(item => ({
        cveNumber: item.id,
        cveTitle: item.title,
        releaseDate: item.publishedDate,
        severity: item.severity as "Critical" | "Important" | "Moderate" | "Low",
        baseScore: item.cvssScore,
        impact: item.description.split('。')[0],
        exploited: item.exploited === "Yes",
        customerActionRequired: Math.random() > 0.5, // 随机设置
        kbNumbers: item.kbNumbers,
        productAffected: item.affectedProducts
      }))
      
      setVulnerabilities(formattedData)
    } catch (error) {
      console.error("加载模拟数据失败:", error)
      setError("数据加载失败，请刷新页面重试")
    } finally {
      setLoading(false)
    }
  }
  
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
      case "exploited":
        return item.exploited
      default:
        return true
    }
  })
  
  // 计算总页数
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
  
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
  
  return (
    <div id="patch-list-top">
      <h2 className="text-2xl font-bold mb-4">安全漏洞列表</h2>
      
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
              全部
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
              严重
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
              重要
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
              已被利用
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
        </>
      ) : (
        !loading && !error && (
          <div className="text-center py-16 bg-card rounded-lg shadow">
            <div className="text-5xl mb-4 text-gray-400">
              <i className="fas fa-search"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">未找到匹配的补丁信息</h3>
            <p className="text-gray-500 mb-4">请尝试调整查询条件或选择其他日期范围</p>
            <Button
              variant="outline"
              onClick={() => setCurrentTab("all")}
            >
              重置筛选条件
            </Button>
          </div>
        )
      )}
    </div>
  )
} 