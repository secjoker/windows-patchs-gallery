"use client"

import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { VulnerabilityCard } from "@/components/vulnerability-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchVulnerabilities, Vulnerability } from "@/lib/api";
import { useEffect, useState } from "react";
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { SearchFilters } from '@/components/search-filters'
import { Statistics } from '@/components/statistics'
import { DataVisualization } from '@/components/data-visualization'
import { PatchList } from '@/components/patch-list'
import { Footer } from '@/components/footer'

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([])
  const [error, setError] = useState<string | null>(null)

  // 组件加载后显示加载状态2秒，模拟网络请求
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <Navbar />
      
      <main>
        {/* Hero 区域 */}
        <Hero />
        
        {/* 主内容区域 */}
        <div className="container mx-auto px-4 md:px-6 py-12 -mt-12 relative z-20">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-lg">正在加载数据，请稍候...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
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
          ) : (
            <>
              {/* 统计数据 */}
              <div className="mb-12">
                <Statistics />
              </div>
              
              {/* 数据可视化 */}
              <div className="mb-12">
                <DataVisualization />
              </div>
              
              {/* 漏洞列表 */}
              <PatchList />
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
