"use client"

import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { VulnerabilityCard } from "@/components/vulnerability-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchVulnerabilities, Vulnerability } from "@/lib/api";
import { useEffect, useState, useCallback } from "react";
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { SearchFilters } from '@/components/search-filters'
import { Statistics } from '@/components/statistics'
import { DataVisualization } from '@/components/data-visualization'
import { PatchList } from '@/components/patch-list'
import { Footer } from '@/components/footer'
import { addDays } from "date-fns";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [vulnerabilities, setVulnerabilities] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 处理搜索过滤器查询
  const handleSearch = useCallback(async (filters: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("执行搜索，过滤条件:", filters);
      const { dateRange } = filters;
      
      if (!dateRange?.from || !dateRange?.to) {
        throw new Error("请选择有效的日期范围");
      }
      
      const fetchedData = await fetchVulnerabilities(dateRange.from, dateRange.to);
      
      // 转换数据
      const formattedData = fetchedData.map(item => ({
        cveNumber: item.id,
        cveTitle: item.title,
        releaseDate: item.publishedDate,
        severity: item.severity,
        baseScore: item.cvssScore,
        impact: item.description.split('。')[0],
        exploited: item.exploited === "Yes",
        customerActionRequired: Math.random() > 0.5, // 随机设置
        kbNumbers: item.kbNumbers || [],
        productAffected: item.affectedProducts || []
      }));
      
      setVulnerabilities(formattedData);
    } catch (error) {
      console.error("搜索失败:", error);
      setError(error instanceof Error ? error.message : "搜索失败，请重试");
      setVulnerabilities([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 初始加载 - 默认加载最近30天的数据
  useEffect(() => {
    const initialSearch = async () => {
      const endDate = new Date();
      const startDate = addDays(endDate, -30);
      
      await handleSearch({
        dateRange: {
          from: startDate,
          to: endDate
        }
      });
    };
    
    initialSearch();
  }, [handleSearch]);

  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <Navbar />
      
      <main>
        {/* Hero 区域 */}
        <Hero />
        
        {/* 主内容区域 */}
        <div className="container mx-auto px-4 md:px-6 py-12 -mt-12 relative z-20">
          {/* 搜索过滤器 */}
          <div className="mb-8">
            <SearchFilters onSearch={handleSearch} isSearching={isLoading} />
          </div>
          
          <>
            {/* 统计数据 */}
            {vulnerabilities.length > 0 && (
              <div className="mb-12">
                <Statistics />
              </div>
            )}
            
            {/* 数据可视化 */}
            {vulnerabilities.length > 0 && (
              <div className="mb-12">
                <DataVisualization />
              </div>
            )}
            
            {/* 漏洞列表 */}
            <PatchList data={vulnerabilities} />
          </>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
