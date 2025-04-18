"use client"

import { useEffect, useRef } from "react"
import { Card } from "./ui/card"
import * as echarts from "echarts"
import { useTheme } from "next-themes"
import { getSeverityChinese, getImpactChinese } from "@/lib/utils"

interface DataVisualizationProps {
  data?: {
    severity: {
      Critical: number
      Important: number
      Moderate: number
      Low: number
    }
    impact: Record<string, number>
  }
}

export function DataVisualization({ data }: DataVisualizationProps) {
  const severityChartRef = useRef<HTMLDivElement>(null)
  const impactChartRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  
  useEffect(() => {
    if (!data || !severityChartRef.current || !impactChartRef.current) return
    
    // 创建严重性分布图表
    const severityChart = echarts.init(severityChartRef.current, theme === "dark" ? "dark" : undefined)
    const severityData = Object.entries(data.severity)
      .map(([key, value]) => ({ value, name: getSeverityChinese(key) }))
      .filter(item => item.value > 0)
    
    severityChart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "horizontal",
        bottom: 10,
        data: severityData.map(item => item.name)
      },
      series: [
        {
          name: "严重性分布",
          type: "pie",
          radius: ["40%", "60%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "18",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          data: severityData,
          color: ["#e81123", "#f7630c", "#fcd116", "#107c10"]
        }
      ]
    })
    
    // 创建漏洞类型分布图表
    const impactChart = echarts.init(impactChartRef.current, theme === "dark" ? "dark" : undefined)
    const impactData = Object.entries(data.impact)
      .map(([key, value]) => ({ value, name: getImpactChinese(key) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
    
    impactChart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "horizontal",
        bottom: 10,
        data: impactData.map(item => item.name)
      },
      series: [
        {
          name: "漏洞类型",
          type: "pie",
          radius: ["30%", "60%"],
          roseType: "radius",
          avoidLabelOverlap: false,
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true
            }
          },
          labelLine: {
            show: false
          },
          data: impactData
        }
      ]
    })
    
    // 监听窗口调整大小事件
    const handleResize = () => {
      severityChart.resize()
      impactChart.resize()
    }
    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("resize", handleResize)
      severityChart.dispose()
      impactChart.dispose()
    }
  }, [data, theme])
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <Card className="lg:col-span-2 p-4">
        <h3 className="text-lg font-bold mb-4">漏洞严重性分布</h3>
        <div ref={severityChartRef} className="h-64"></div>
      </Card>
      <Card className="p-4">
        <h3 className="text-lg font-bold mb-4">漏洞类型分布</h3>
        <div ref={impactChartRef} className="h-64"></div>
      </Card>
    </div>
  )
} 