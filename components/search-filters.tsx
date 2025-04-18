"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { DatePickerWithRange } from "./date-picker-with-range"
import { addDays } from "date-fns"

export function SearchFilters() {
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  
  const [dateRangeError, setDateRangeError] = useState<string>()
  
  return (
    <Card className="bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-xl p-6 max-w-4xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
      </div>
      
      <div className="mb-4">
        <label className="block text-left text-white text-sm mb-2">漏洞严重性</label>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="filter-critical" defaultChecked />
            <label htmlFor="filter-critical" className="text-white">
              严重 (Critical)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="filter-important" defaultChecked />
            <label htmlFor="filter-important" className="text-white">
              重要 (Important)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="filter-moderate" />
            <label htmlFor="filter-moderate" className="text-white">
              中等 (Moderate)
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="filter-low" />
            <label htmlFor="filter-low" className="text-white">
              低危 (Low)
            </label>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-left text-white text-sm mb-2">特定产品 (可选)</label>
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
      
      <Button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold tracking-wide">
        <i className="fas fa-search mr-2"></i> 查询补丁信息
      </Button>
    </Card>
  )
} 