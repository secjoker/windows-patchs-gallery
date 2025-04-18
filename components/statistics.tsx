"use client"

import { useEffect, useState } from "react"
import { Card } from "./ui/card"

interface StatisticsProps {
  data?: {
    total: number
    critical: number
    important: number
    exploited: number
  }
}

export function Statistics({ data = { total: 0, critical: 0, important: 0, exploited: 0 } }: StatisticsProps) {
  const [stats, setStats] = useState(data)
  
  useEffect(() => {
    // 数字增长动画
    const duration = 1000
    const frameDuration = 1000/60
    const totalFrames = Math.round(duration / frameDuration)
    
    const animateValue = (start: number, end: number, setter: (value: number) => void) => {
      const increment = (end - start) / totalFrames
      let currentFrame = 0
      let currentValue = start
      
      const animate = () => {
        currentFrame++
        currentValue += increment
        
        if (currentFrame === totalFrames) {
          setter(end)
        } else {
          setter(Math.floor(currentValue))
          requestAnimationFrame(animate)
        }
      }
      
      animate()
    }
    
    animateValue(0, data.total, (value) => setStats(prev => ({ ...prev, total: value })))
    animateValue(0, data.critical, (value) => setStats(prev => ({ ...prev, critical: value })))
    animateValue(0, data.important, (value) => setStats(prev => ({ ...prev, important: value })))
    animateValue(0, data.exploited, (value) => setStats(prev => ({ ...prev, exploited: value })))
  }, [data])
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
      <Card className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-md rounded-xl p-4 flex flex-col items-center border border-white border-opacity-10">
        <div className="text-3xl mb-1 text-white"><i className="fas fa-shield-alt"></i></div>
        <div className="text-3xl font-bold text-white">{stats.total}</div>
        <div className="text-sm text-white opacity-80">补丁总数</div>
      </Card>
      
      <Card className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-md rounded-xl p-4 flex flex-col items-center border border-white border-opacity-10">
        <div className="text-3xl mb-1 text-white"><i className="fas fa-exclamation-triangle"></i></div>
        <div className="text-3xl font-bold text-white">{stats.critical}</div>
        <div className="text-sm text-white opacity-80">严重漏洞</div>
      </Card>
      
      <Card className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-md rounded-xl p-4 flex flex-col items-center border border-white border-opacity-10">
        <div className="text-3xl mb-1 text-white"><i className="fas fa-exclamation-circle"></i></div>
        <div className="text-3xl font-bold text-white">{stats.important}</div>
        <div className="text-sm text-white opacity-80">重要漏洞</div>
      </Card>
      
      <Card className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-md rounded-xl p-4 flex flex-col items-center border border-white border-opacity-10">
        <div className="text-3xl mb-1 text-white"><i className="fas fa-bug"></i></div>
        <div className="text-3xl font-bold text-white">{stats.exploited}</div>
        <div className="text-sm text-white opacity-80">已被利用漏洞</div>
      </Card>
    </div>
  )
} 