"use client"

import { format } from "date-fns";
import { mockVulnerabilities } from './mock-data';

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
  return mockVulnerabilities.filter(vuln => {
    const vulnDate = new Date(vuln.publishedDate);
    return vulnDate >= startDate && vulnDate <= endDate;
  });
}
