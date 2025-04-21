"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "./ui/card"
import * as echarts from "echarts"
import { useTheme } from "next-themes"
import { getSeverityChinese, getImpactChinese } from "@/lib/utils"
import { extendedMockVulnerabilities } from "@/lib/mock-data"

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
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<any>(null)
  
  // 生成默认的模拟数据
  useEffect(() => {
    // 如果已经有传入的数据，则使用传入的数据
    if (data) {
      setChartData(data)
      setLoading(false)
      return
    }
    
    // 否则生成默认数据
    const mockData = {
      severity: {
        Critical: 0,
        Important: 0,
        Moderate: 0,
        Low: 0
      },
      impact: {} as Record<string, number>
    }
    
    // 从模拟数据中统计severity
    extendedMockVulnerabilities.forEach(vuln => {
      if (vuln.severity in mockData.severity) {
        mockData.severity[vuln.severity as keyof typeof mockData.severity]++
      }
      
      // 处理impact类型，从描述中提取第一个句子作为impact类型
      const impact = vuln.description.split('。')[0].substring(0, 20) // 限制长度避免重叠
      if (impact in mockData.impact) {
        mockData.impact[impact]++
      } else {
        mockData.impact[impact] = 1
      }
    })
    
    setTimeout(() => {
      setChartData(mockData)
      setLoading(false)
    }, 300)
  }, [data])
  
  // 初始化和更新图表
  useEffect(() => {
    if (!chartData || !severityChartRef.current || !impactChartRef.current) return
    
    // 创建严重性分布图表
    const severityChart = echarts.init(severityChartRef.current, theme === "dark" ? "dark" : undefined)
    const severityData = Object.entries(chartData.severity)
      .map(([key, value]) => ({ value: value as number, name: getSeverityChinese(key) }))
      .filter(item => item.value > 0)
    
    const severityOptions = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "horizontal",
        bottom: 0,
        left: 'center',
        itemWidth: 14,
        itemHeight: 10,
        textStyle: {
          fontSize: 12
        },
        data: severityData.map(item => item.name)
      },
      color: ["#e81123", "#f7630c", "#fcd116", "#107c10"],
      series: [
        {
          name: "严重性分布",
          type: "pie",
          radius: ["40%", "65%"],
          center: ['50%', '40%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 6,
            borderWidth: 2
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              formatter: '{b}: {c} ({d}%)',
              fontSize: 14,
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          data: severityData
        }
      ]
    }
    
    severityChart.setOption(severityOptions as any)
    
    // 创建漏洞类型分布图表
    const impactChart = echarts.init(impactChartRef.current, theme === "dark" ? "dark" : undefined)
    const impactData = Object.entries(chartData.impact)
      .map(([key, value]) => ({ 
        value: value as number, 
        name: key.length > 10 ? key.substring(0, 10) + '...' : key // 截断名称以避免重叠
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
    
    const impactOptions = {
      tooltip: {
        trigger: "item",
        formatter: function(params: any) {
          return `${params.seriesName} <br/>${params.name}: ${params.value} (${params.percent}%)`
        }
      },
      legend: {
        type: 'scroll',
        orient: "horizontal",
        bottom: 0,
        left: 'center',
        itemWidth: 14,
        itemHeight: 10,
        textStyle: {
          fontSize: 11
        },
        pageButtonPosition: 'end',
        data: impactData.map(item => item.name)
      },
      series: [
        {
          name: "漏洞类型",
          type: "pie",
          radius: "65%",
          center: ['50%', '40%'],
          roseType: "radius",
          itemStyle: {
            borderRadius: 4
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true,
              formatter: '{b}: {c}',
              fontSize: 12
            }
          },
          labelLine: {
            show: false
          },
          data: impactData
        }
      ]
    }
    
    impactChart.setOption(impactOptions as any)
    
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
  }, [chartData, theme])
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <Card className="lg:col-span-2 p-4">
        <h3 className="text-lg font-bold mb-2">漏洞严重性分布</h3>
        {loading ? (
          <div className="h-72 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">加载中...</span>
          </div>
        ) : (
          <div ref={severityChartRef} className="h-72"></div>
        )}
      </Card>
      <Card className="p-4">
        <h3 className="text-lg font-bold mb-2">漏洞类型分布</h3>
        {loading ? (
          <div className="h-72 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">加载中...</span>
          </div>
        ) : (
          <div ref={impactChartRef} className="h-72"></div>
        )}
      </Card>
    </div>
  )
} 