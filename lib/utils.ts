import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue: number }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variableName}) / ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export function formatDate(date: Date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

export function formatDateForFilename(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

export function getSeverityChinese(severity: string) {
  const map: Record<string, string> = {
    'Critical': '严重',
    'Important': '重要',
    'Moderate': '中等',
    'Low': '低危'
  }
  return map[severity] || severity
}

export function getImpactChinese(impact: string) {
  const map: Record<string, string> = {
    'Remote Code Execution': '远程代码执行',
    'Elevation of Privilege': '特权提升',
    'Information Disclosure': '信息泄露',
    'Denial of Service': '拒绝服务',
    'Spoofing': '欺骗',
    'Tampering': '篡改',
    'Security Feature Bypass': '安全功能绕过'
  }
  return map[impact] || impact
}

export function getImpactDescription(impact: string) {
  const descriptions: Record<string, string> = {
    'Remote Code Execution': '此安全更新修复了一个远程代码执行漏洞，攻击者可以通过精心构造的请求利用该漏洞，在目标系统上执行任意代码。',
    'Elevation of Privilege': '此安全更新修复了一个特权提升漏洞，攻击者成功利用后可以获得更高的系统权限。',
    'Information Disclosure': '此安全更新修复了一个信息泄露漏洞，攻击者可以获取本不应公开的系统信息。',
    'Denial of Service': '此安全更新修复了一个拒绝服务漏洞，攻击者可以导致系统或服务不可用。',
    'Spoofing': '此安全更新修复了一个欺骗漏洞，攻击者可以冒充其他实体或资源。',
    'Tampering': '此安全更新修复了一个篡改漏洞，攻击者可以修改数据或系统设置。',
    'Security Feature Bypass': '此安全更新修复了一个安全功能绕过漏洞，攻击者可以绕过某些安全控制。'
  }
  return descriptions[impact] || `此安全更新修复了一个${getImpactChinese(impact)}漏洞。`
}
