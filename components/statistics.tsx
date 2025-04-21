"use client"

import { useEffect, useState } from "react"
import { Card } from "./ui/card"
import { extendedMockVulnerabilities } from "@/lib/mock-data"
import { AlertTriangle, Shield, Bug, PieChart } from "lucide-react"

export function Statistics() {
  // 统计数据
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    important: 0,
    exploited: 0
  })
  
  const [loading, setLoading] = useState(true)
  
  // 计算统计数据
  useEffect(() => {
    // 从模拟数据计算
    const total = extendedMockVulnerabilities.length
    const critical = extendedMockVulnerabilities.filter(v => v.severity === "Critical").length
    const important = extendedMockVulnerabilities.filter(v => v.severity === "Important").length
    const exploited = extendedMockVulnerabilities.filter(v => v.exploited === "Yes").length
    
    // 延迟一下，模拟数据加载过程，但不使用动画效果以避免抖动
    setTimeout(() => {
      setStats({
        total,
        critical,
        important,
        exploited
      })
      setLoading(false)
    }, 300)
  }, [])
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
      {loading ? (
        <>
          {[1, 2, 3, 4].map((_, i) => (
            <Card key={i} className="bg-gray-100 dark:bg-gray-800 p-6 flex flex-col items-center justify-center min-h-[120px]">
              <div className="animate-pulse h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full mb-2"></div>
              <div className="animate-pulse h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="animate-pulse h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </Card>
          ))}
        </>
      ) : (
        <>
          <StatCard 
            title="补丁总数" 
            value={stats.total} 
            icon={<PieChart className="h-5 w-5" />} 
            color="bg-gradient-to-br from-blue-600 to-blue-400"
          />
          <StatCard 
            title="严重漏洞" 
            value={stats.critical} 
            icon={<AlertTriangle className="h-5 w-5" />} 
            color="bg-gradient-to-br from-red-600 to-red-400"
          />
          <StatCard 
            title="重要漏洞" 
            value={stats.important} 
            icon={<Shield className="h-5 w-5" />} 
            color="bg-gradient-to-br from-orange-600 to-orange-400"
          />
          <StatCard 
            title="已被利用漏洞" 
            value={stats.exploited} 
            icon={<Bug className="h-5 w-5" />} 
            color="bg-gradient-to-br from-purple-600 to-purple-400"
          />
        </>
      )}
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Card className={`${color} text-white p-6 flex flex-col items-center justify-center shadow-md hover:shadow-lg transition-shadow rounded-lg border-none`}>
      <div className="mb-2 bg-white/20 p-2 rounded-full">
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-90">{title}</div>
    </Card>
  )
} 