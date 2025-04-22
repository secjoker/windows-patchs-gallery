"use client"

import { DatePickerWithRange } from "@/components/date-picker-with-range";
import { VulnerabilityCard } from "@/components/vulnerability-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchVulnerabilities, Vulnerability, SeverityLevel } from "@/lib/api";
import { useEffect, useState, useCallback } from "react";
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { SearchFilters } from '@/components/search-filters'
import { Statistics } from '@/components/statistics'
import { DataVisualization } from '@/components/data-visualization'
import { PatchList } from '@/components/patch-list'
import { Footer } from '@/components/footer'
import { addDays } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

// 主页组件内部类型定义
interface FormattedVulnerability {
  cveNumber: string;
  cveTitle: string;
  releaseDate: string;
  severity: SeverityLevel;
  baseScore: number;
  impact: string;
  exploited: boolean;
  customerActionRequired: boolean;
  kbNumbers: string[];
  productAffected: string[];
}

export default function Home() {
  // 全局状态
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [vulnerabilities, setVulnerabilities] = useState<FormattedVulnerability[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 处理搜索过滤器查询
  const handleSearch = useCallback(async (filters: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("执行搜索，过滤条件:", filters);
      const { dateRange, severity } = filters;
      
      if (!dateRange?.from || !dateRange?.to) {
        throw new Error("请选择有效的日期范围");
      }
      
      // 获取API数据
      const fetchedData = await fetchVulnerabilities(dateRange.from, dateRange.to);
      
      // 按严重性筛选（如果有选择）
      let filteredData = fetchedData;
      if (severity) {
        const enabledSeverities = Object.entries(severity)
          .filter(([_, enabled]) => enabled)
          .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1)) as SeverityLevel[];
        
        if (enabledSeverities.length > 0) {
          filteredData = fetchedData.filter(item => 
            enabledSeverities.includes(item.severity)
          );
        }
      }
      
      // 转换数据
      const formattedData = filteredData.map(item => ({
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
      
      // 更新全局状态
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
        },
        severity: {
          critical: true,
          important: true,
          moderate: true,
          low: true
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
        <div className="container mx-auto px-4 md:px-6 py-12 -mt-36 relative z-20">
          {/* 搜索过滤器 */}
          <div className="mb-12 max-w-4xl mx-auto">
            <SearchFilters onSearch={handleSearch} isSearching={isLoading} />
          </div>
          
          {/* 显示加载状态 */}
          {isLoading && vulnerabilities.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 bg-card/50 backdrop-blur-sm rounded-lg shadow-sm">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-lg text-gray-600 dark:text-gray-300">正在加载漏洞数据，请稍候...</p>
            </div>
          )}
          
          {/* 显示错误信息 */}
          {error && !isLoading && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-6 rounded">
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
          )}
          
          {/* 数据展示区域 */}
          {!isLoading && !error && vulnerabilities.length > 0 && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8 w-full justify-start">
                <TabsTrigger value="overview" className="text-base">数据概览</TabsTrigger>
                <TabsTrigger value="list" className="text-base">漏洞列表</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8">
                {/* 使用自动加载模拟数据的统计和可视化组件 */}
                <div className="mb-8">
                  <Statistics />
                </div>
                
                <div className="mb-8">
                  <DataVisualization />
                </div>
              </TabsContent>
              
              <TabsContent value="list">
                {/* 传递漏洞数据到列表组件 */}
                <PatchList data={vulnerabilities} />
              </TabsContent>
            </Tabs>
          )}
          
          {/* 无数据提示 */}
          {!isLoading && !error && vulnerabilities.length === 0 && (
            <div className="text-center py-16 bg-card rounded-lg shadow">
              <div className="text-5xl mb-4 text-gray-400">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">未找到匹配的漏洞信息</h3>
              <p className="text-gray-500 mb-4">请尝试调整查询条件或选择其他日期范围</p>
              <Button onClick={() => handleSearch({
                dateRange: {
                  from: addDays(new Date(), -90),
                  to: new Date()
                },
                severity: {
                  critical: true,
                  important: true,
                  moderate: true,
                  low: true
                }
              })}>
                扩大查询范围
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
