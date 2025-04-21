"use client"

import { useEffect, useState } from "react"
import { Card } from "./ui/card"
import { extendedMockVulnerabilities } from "@/lib/mock-data"

export function Statistics() {
  // 统计数据
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    important: 0,
    exploited: 0
  })
  
  const [showStats, setShowStats] = useState(false)
  
  // 计算统计数据
  useEffect(() => {
    // 从模拟数据计算
    const total = extendedMockVulnerabilities.length
    const critical = extendedMockVulnerabilities.filter(v => v.severity === "Critical").length
    const important = extendedMockVulnerabilities.filter(v => v.severity === "Important").length
    const exploited = extendedMockVulnerabilities.filter(v => v.exploited === "Yes").length
    
    // 设置初始值为0
    setStats({
      total: 0,
      critical: 0,
      important: 0,
      exploited: 0
    })
    
    // 显示动画延迟
    setTimeout(() => {
      setShowStats(true)
      
      // 使用动画数值
      let currentTotal = 0
      let currentCritical = 0
      let currentImportant = 0
      let currentExploited = 0
      
      const animationDuration = 1500
      const framesPerSecond = 60
      const totalFrames = animationDuration / 1000 * framesPerSecond
      
      let currentFrame = 0
      
      const interval = setInterval(() => {
        const progress = currentFrame / totalFrames
        currentFrame++
        
        if (progress >= 1) {
          setStats({
            total,
            critical,
            important,
            exploited
          })
          clearInterval(interval)
          return
        }
        
        // 使用缓动函数使动画更流畅
        const easedProgress = 1 - Math.pow(1 - progress, 3)
        
        setStats({
          total: Math.round(easedProgress * total),
          critical: Math.round(easedProgress * critical),
          important: Math.round(easedProgress * important),
          exploited: Math.round(easedProgress * exploited)
        })
      }, 1000 / framesPerSecond)
      
      return () => clearInterval(interval)
    }, 300)
  }, [])
  
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto transition-opacity duration-500 ${showStats ? 'opacity-100' : 'opacity-0'}`}>
      <StatCard 
        title="补丁总数" 
        value={stats.total} 
        icon="fas fa-shield-alt" 
        color="bg-gradient-to-r from-blue-500 to-blue-600"
      />
      <StatCard 
        title="严重漏洞" 
        value={stats.critical} 
        icon="fas fa-exclamation-triangle" 
        color="bg-gradient-to-r from-red-500 to-red-600"
      />
      <StatCard 
        title="重要漏洞" 
        value={stats.important} 
        icon="fas fa-exclamation-circle" 
        color="bg-gradient-to-r from-orange-500 to-orange-600"
      />
      <StatCard 
        title="已被利用漏洞" 
        value={stats.exploited} 
        icon="fas fa-bug" 
        color="bg-gradient-to-r from-purple-500 to-purple-600"
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  icon: string
  color: string
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Card className={`${color} text-white p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow`}>
      <div className="text-4xl mb-2">
        <i className={icon}></i>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-90">{title}</div>
    </Card>
  )
} 