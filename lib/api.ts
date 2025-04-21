"use client"

import { format } from "date-fns";
import { extendedMockVulnerabilities } from './mock-data';

export interface Vulnerability {
  id: string;
  title: string;
  severity: "Critical" | "Important" | "Low";
  exploited: "Yes" | "No";
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
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 根据日期范围过滤数据
  return extendedMockVulnerabilities.filter(vuln => {
    const vulnDate = new Date(vuln.publishedDate);
    return vulnDate >= startDate && vulnDate <= endDate;
  });
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
