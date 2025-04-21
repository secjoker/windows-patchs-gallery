"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { DatePickerWithRange } from "./date-picker-with-range"
import { addDays } from "date-fns"
import { Card } from "./ui/card"

export function SearchFilters() {
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  
  const [dateRangeError, setDateRangeError] = useState<string>()
  const [isSearching, setIsSearching] = useState(false)
  
  // 处理搜索按钮点击
  const handleSearch = () => {
    if (dateRangeError) return
    
    setIsSearching(true)
    
    // 模拟API请求
    setTimeout(() => {
      setIsSearching(false)
      // 触发搜索事件 - 在实际实现中应该调用父组件传入的回调
      console.log("执行搜索:", {
        dateRange,
        // 其他过滤条件...
      })
    }, 1000)
  }
  
  return (
    <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl p-6 border-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">选择日期范围</h3>
          <DatePickerWithRange
            value={dateRange}
            onChange={(range) => {
              if (range?.from && range?.to) {
                setDateRange({ from: range.from, to: range.to })
                setDateRangeError(undefined)
              }
            }}
            maxRange={90}
            onRangeError={(error: string) => setDateRangeError(error)}
            errorMessage={dateRangeError}
          />
          {dateRangeError && (
            <p className="text-sm text-red-500 mt-1">{dateRangeError}</p>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">漏洞严重性</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="filter-critical" defaultChecked />
              <label htmlFor="filter-critical" className="text-gray-800 dark:text-gray-200 cursor-pointer text-sm">
                严重 (Critical)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="filter-important" defaultChecked />
              <label htmlFor="filter-important" className="text-gray-800 dark:text-gray-200 cursor-pointer text-sm">
                重要 (Important)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="filter-moderate" />
              <label htmlFor="filter-moderate" className="text-gray-800 dark:text-gray-200 cursor-pointer text-sm">
                中等 (Moderate)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="filter-low" />
              <label htmlFor="filter-low" className="text-gray-800 dark:text-gray-200 cursor-pointer text-sm">
                低危 (Low)
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">
            特定产品 (可选)
          </label>
          <Select>
            <SelectTrigger className="w-full bg-white dark:bg-gray-800">
              <SelectValue placeholder="所有产品" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="windows_11">Windows 11</SelectItem>
              <SelectItem value="windows_10">Windows 10</SelectItem>
              <SelectItem value="windows_server">Windows Server</SelectItem>
              <SelectItem value="edge">Microsoft Edge</SelectItem>
              <SelectItem value="office">Microsoft Office</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">
            漏洞状态
          </label>
          <Select>
            <SelectTrigger className="w-full bg-white dark:bg-gray-800">
              <SelectValue placeholder="所有状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="exploited">已被利用</SelectItem>
              <SelectItem value="not_exploited">未被利用</SelectItem>
              <SelectItem value="action_required">需要客户操作</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">
            排序方式
          </label>
          <Select>
            <SelectTrigger className="w-full bg-white dark:bg-gray-800">
              <SelectValue placeholder="发布日期（最新优先）" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date_desc">发布日期（最新优先）</SelectItem>
              <SelectItem value="date_asc">发布日期（最早优先）</SelectItem>
              <SelectItem value="severity_desc">严重性（从高到低）</SelectItem>
              <SelectItem value="severity_asc">严重性（从低到高）</SelectItem>
              <SelectItem value="cvss_desc">CVSS评分（从高到低）</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={handleSearch}
          disabled={!!dateRangeError || isSearching}
          className="min-w-[200px] py-6 text-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold tracking-wide hover:opacity-90 transition-opacity"
        >
          {isSearching ? (
            <>
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              搜索中...
            </>
          ) : (
            <>
              <i className="fas fa-search mr-2"></i> 查询补丁信息
            </>
          )}
        </Button>
      </div>
    </Card>
  )
} 