/**
 * 此文件用于导出类型和转换函数
 * 用于确保类型在整个应用程序中一致
 */

import { Vulnerability, VulnerabilityDetail, SeverityLevel, ExploitedStatus } from './api';

/**
 * 将基本漏洞信息转换为详细信息
 */
export function convertToVulnerabilityDetail(vulnerability: Vulnerability): VulnerabilityDetail {
  // 根据描述推断影响类型
  const impactType = getImpactType(vulnerability.description.toLowerCase());
  
  return {
    ...vulnerability,
    cveNumber: vulnerability.id,
    cveTitle: vulnerability.title,
    releaseDate: vulnerability.publishedDate,
    impact: impactType,
    publiclyDisclosed: vulnerability.exploited,
    cweList: ["CWE-79", "CWE-89"], // 模拟数据
    articles: [
      {
        articleType: "Advisory",
        description: vulnerability.description
      }
    ],
    revisions: [
      {
        version: "1.0",
        revisionDate: vulnerability.lastUpdated,
        description: "Initial release"
      }
    ],
    mitreUrl: `https://cve.mitre.org/cgi-bin/cvename.cgi?name=${vulnerability.id}`,
    productAffected: vulnerability.affectedProducts
  };
}

/**
 * 从描述文本推断影响类型
 */
export function getImpactType(description: string): string {
  if (description.includes("remote code execution")) return "Remote Code Execution";
  if (description.includes("elevation of privilege")) return "Elevation of Privilege";
  if (description.includes("information disclosure")) return "Information Disclosure";
  if (description.includes("denial of service")) return "Denial of Service";
  if (description.includes("spoofing")) return "Spoofing";
  if (description.includes("tampering")) return "Tampering";
  if (description.includes("security feature bypass")) return "Security Feature Bypass";
  return "Unknown";
}

/**
 * 将英文影响类型转换为中文
 */
export function getImpactChinese(impact: string): string {
  const map: {[key: string]: string} = {
    'Remote Code Execution': '远程代码执行',
    'Elevation of Privilege': '特权提升',
    'Information Disclosure': '信息泄露',
    'Denial of Service': '拒绝服务',
    'Spoofing': '欺骗',
    'Tampering': '篡改',
    'Security Feature Bypass': '安全功能绕过',
    'Unknown': '未知'
  };
  return map[impact] || impact;
}

/**
 * 将严重性级别转换为中文
 */
export function getSeverityChinese(severity: SeverityLevel): string {
  const map: {[key in SeverityLevel]: string} = {
    'Critical': '严重',
    'Important': '重要',
    'Moderate': '中等',
    'Low': '低危'
  };
  return map[severity];
}

/**
 * 格式化日期
 */
export function formatDate(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
} 