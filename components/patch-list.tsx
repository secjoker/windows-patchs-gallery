"use client"

import { useState } from "react"
import { VulnerabilityCard } from "./vulnerability-card"
import { Button } from "./ui/button"

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
  const [displayedCount, setDisplayedCount] = useState(12)
  
  // 根据当前标签过滤数据
  const filteredData = data.filter(item => {
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
  
  // 获取当前显示的数据
  const displayedData = filteredData.slice(0, displayedCount)
  
  return (
    <>
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
      
      {/* 补丁列表 */}
      {displayedData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedData.map((vulnerability) => (
              <VulnerabilityCard
                key={vulnerability.cveNumber}
                vulnerability={vulnerability}
                onClick={() => {
                  // TODO: 显示详情模态框
                }}
              />
            ))}
          </div>
          
          {/* 加载更多按钮 */}
          {displayedCount < filteredData.length && (
            <div className="text-center mb-8">
              <Button
                onClick={() => setDisplayedCount(prev => prev + 12)}
                className="bg-gradient-to-r from-blue-600 to-blue-400 text-white"
              >
                <i className="fas fa-arrow-down mr-2"></i> 加载更多
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 card">
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
      )}
    </>
  )
} 