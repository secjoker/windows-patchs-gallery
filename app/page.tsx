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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <Navbar />
      
      <main>
        {/* Hero 区域 */}
        <Hero />
        
        {/* 主内容区域 */}
        <div className="container mx-auto px-4 md:px-6 py-12 -mt-12 relative z-20">
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
