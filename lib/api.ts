"use client"

import { format } from "date-fns";
import { extendedMockVulnerabilities } from './mock-data';

export type SeverityLevel = "Critical" | "Important" | "Moderate" | "Low";
export type ExploitedStatus = "Yes" | "No";

export interface Vulnerability {
  id: string;
  title: string;
  severity: SeverityLevel;
  exploited: ExploitedStatus;
  description: string;
  affectedProducts: string[];
  publishedDate: string;
  lastUpdated: string;
  kbNumbers: string[];
  cvssScore: number;
  workarounds: string[];
}

export interface ApiResponse {
  "@odata.context": string;
  "@odata.count": number;
  value: Vulnerability[];
}

export async function fetchVulnerabilities(startDate: Date, endDate: Date): Promise<Vulnerability[]> {
  // 模拟 API 延迟，减少延迟时间以避免长时间加载
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    // 根据日期范围过滤数据
    const filteredData = extendedMockVulnerabilities.filter(vuln => {
      try {
        const vulnDate = new Date(vuln.publishedDate);
        return vulnDate >= startDate && vulnDate <= endDate;
      } catch (error) {
        console.error("日期解析错误:", error, vuln.publishedDate);
        return false;
      }
    });
    
    console.log(`过滤后的漏洞数量: ${filteredData.length}`);
    return filteredData;
  } catch (error) {
    console.error("获取漏洞数据出错:", error);
    return [];
  }
}

// 模拟 API 延迟的辅助函数
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 格式化数据的辅助方法，将模拟数据转换为接口格式
export function formatAsApiResponse(data: Vulnerability[]): ApiResponse {
  return {
    "@odata.context": "https://api.msrc.microsoft.com/sug/v2.0/$metadata#vulnerability",
    "@odata.count": data.length,
    value: data
  };
}
