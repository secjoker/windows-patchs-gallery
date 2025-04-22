import { Vulnerability, SeverityLevel, ExploitedStatus } from "./api";

// 漏洞类型常量
const IMPACT_TYPES = [
  "Remote Code Execution",
  "Elevation of Privilege", 
  "Information Disclosure",
  "Denial of Service",
  "Spoofing",
  "Tampering",
  "Security Feature Bypass"
];

// 产品名称常量
const PRODUCTS = [
  "Windows 11", 
  "Windows 10", 
  "Windows Server 2022",
  "Windows Server 2019",
  "Microsoft Edge",
  "Microsoft Office",
  "Microsoft Exchange Server",
  "SharePoint Server",
  "SQL Server",
  "Azure Active Directory",
  "Microsoft Teams"
];

export const mockVulnerabilities: Vulnerability[] = [
  {
    id: "CVE-2024-26182",
    title: "Windows Kernel 远程代码执行漏洞",
    severity: "Critical",
    exploited: "Yes",
    description: "Windows 内核中存在远程代码执行漏洞，攻击者可以通过特制的网络请求执行任意代码。此漏洞已在野外被利用，需要立即修补。",
    affectedProducts: ["Windows 10", "Windows 11", "Windows Server 2019", "Windows Server 2022"],
    publishedDate: "2024-04-15",
    lastUpdated: "2024-04-20",
    kbNumbers: ["KB5025721", "KB5025722"],
    cvssScore: 9.8,
    workarounds: ["禁用相关网络服务", "更新系统到最新版本", "安装最新安全补丁"],
  },
  {
    id: "CVE-2024-26171",
    title: "Microsoft Exchange Server 权限提升漏洞",
    severity: "Important",
    exploited: "No",
    description: "Exchange Server 中存在权限提升漏洞，本地攻击者可能获得系统管理员权限。此漏洞影响所有支持的 Exchange Server 版本。",
    affectedProducts: ["Exchange Server 2016", "Exchange Server 2019"],
    publishedDate: "2024-04-10",
    lastUpdated: "2024-04-18",
    kbNumbers: ["KB5025723"],
    cvssScore: 7.5,
    workarounds: ["应用最新安全补丁", "限制管理员访问权限"],
  },
  {
    id: "CVE-2024-26158",
    title: "Windows Print Spooler 服务漏洞",
    severity: "Critical",
    exploited: "Yes",
    description: "Print Spooler 服务中存在安全漏洞，可能导致远程代码执行。此漏洞被称为'PrintNightmare'的变种，已被黑客组织积极利用。",
    affectedProducts: ["Windows 10", "Windows Server 2019", "Windows Server 2022"],
    publishedDate: "2024-04-05",
    lastUpdated: "2024-04-15",
    kbNumbers: ["KB5025724"],
    cvssScore: 9.0,
    workarounds: ["禁用 Print Spooler 服务", "限制打印服务访问权限", "应用微软提供的紧急补丁"],
  },
  {
    id: "CVE-2024-26143",
    title: "Microsoft Office 宏安全漏洞",
    severity: "Important",
    exploited: "No",
    description: "Office 文档中的宏可能绕过安全限制，导致任意代码执行。此漏洞主要通过钓鱼邮件附件传播。",
    affectedProducts: ["Microsoft Office 2019", "Microsoft 365", "Microsoft Office 2021"],
    publishedDate: "2024-04-01",
    lastUpdated: "2024-04-12",
    kbNumbers: ["KB5025725"],
    cvssScore: 7.8,
    workarounds: ["禁用宏", "使用受保护视图", "配置Office应用程序防护策略"],
  },
  {
    id: "CVE-2024-26137",
    title: "Windows Defender 绕过漏洞",
    severity: "Low",
    exploited: "No",
    description: "Windows Defender 可能被绕过，导致恶意软件无法被检测。特定类型的代码混淆技术可以逃避检测。",
    affectedProducts: ["Windows 10", "Windows 11", "Microsoft Defender for Endpoint"],
    publishedDate: "2024-03-28",
    lastUpdated: "2024-04-10",
    kbNumbers: ["KB5025726"],
    cvssScore: 4.2,
    workarounds: ["更新病毒库", "启用启发式扫描", "启用额外的安全功能"],
  },
  {
    id: "CVE-2024-26121",
    title: "Azure Active Directory 身份验证绕过",
    severity: "Critical",
    exploited: "Yes",
    description: "Azure AD 中存在身份验证绕过漏洞，可能导致未经授权的访问。攻击者可以在不知道密码的情况下获取有效的访问令牌。",
    affectedProducts: ["Azure Active Directory", "Microsoft 365", "Microsoft Entra ID"],
    publishedDate: "2024-03-25",
    lastUpdated: "2024-04-08",
    kbNumbers: ["KB5025727"],
    cvssScore: 9.5,
    workarounds: ["启用多因素认证", "审查访问日志", "实施条件访问策略"],
  },
  {
    id: "CVE-2024-26119",
    title: "SQL Server 数据库注入漏洞",
    severity: "Important",
    exploited: "Yes",
    description: "SQL Server 中存在 SQL 注入漏洞，可能导致数据泄露或未授权数据访问。此漏洞影响SQL Server的存储过程。",
    affectedProducts: ["SQL Server 2019", "SQL Server 2022", "Azure SQL Database"],
    publishedDate: "2024-03-20",
    lastUpdated: "2024-04-05",
    kbNumbers: ["KB5025728"],
    cvssScore: 8.2,
    workarounds: ["使用参数化查询", "限制数据库用户权限", "应用最新安全补丁"],
  },
  {
    id: "CVE-2024-26112",
    title: "SharePoint Server 跨站脚本漏洞",
    severity: "Low",
    exploited: "No",
    description: "SharePoint 页面中存在 XSS 漏洞，可能导致用户会话被劫持。此漏洞可被用于窃取用户凭据或执行未授权操作。",
    affectedProducts: ["SharePoint Server 2019", "SharePoint Online", "SharePoint Server 2016"],
    publishedDate: "2024-03-15",
    lastUpdated: "2024-03-28",
    kbNumbers: ["KB5025729"],
    cvssScore: 4.8,
    workarounds: ["启用内容安全策略", "更新到最新版本", "禁用不必要的脚本功能"],
  },
  {
    id: "CVE-2024-26106",
    title: "Windows DNS 服务器缓存投毒漏洞",
    severity: "Critical",
    exploited: "No",
    description: "Windows DNS 服务器存在缓存投毒漏洞，可能导致 DNS 解析被劫持。攻击者可以将用户重定向到恶意网站。",
    affectedProducts: ["Windows Server 2019", "Windows Server 2022", "Windows Server 2016"],
    publishedDate: "2024-03-10",
    lastUpdated: "2024-03-25",
    kbNumbers: ["KB5025730"],
    cvssScore: 8.9,
    workarounds: ["启用 DNSSEC", "配置 DNS 安全扩展", "应用最新安全补丁"],
  },
  {
    id: "CVE-2024-26098",
    title: "Microsoft Teams 远程代码执行",
    severity: "Important",
    exploited: "No",
    description: "Teams 客户端存在远程代码执行漏洞，通过特制消息可能触发。攻击者可以通过发送特殊格式的消息执行恶意代码。",
    affectedProducts: ["Microsoft Teams", "Microsoft 365", "Teams for Education"],
    publishedDate: "2024-03-05",
    lastUpdated: "2024-03-20",
    kbNumbers: ["KB5025731"],
    cvssScore: 7.9,
    workarounds: ["更新客户端", "限制文件共享权限", "禁用外部组织消息"],
  },
  {
    id: "CVE-2024-26094",
    title: "Windows Hello 生物识别绕过",
    severity: "Important",
    exploited: "Yes",
    description: "Windows Hello 生物识别认证存在绕过漏洞，可能导致未授权登录。攻击者可以使用特制的硬件设备模拟生物特征。",
    affectedProducts: ["Windows 10", "Windows 11", "Surface设备"],
    publishedDate: "2024-03-01",
    lastUpdated: "2024-03-15",
    kbNumbers: ["KB5025732"],
    cvssScore: 7.4,
    workarounds: ["禁用生物识别登录", "使用强密码认证", "启用多因素认证"],
  },
  {
    id: "CVE-2024-26082",
    title: "Edge 浏览器沙箱逃逸漏洞",
    severity: "Critical",
    exploited: "No",
    description: "Microsoft Edge 浏览器沙箱存在逃逸漏洞，可能导致本地代码执行。此漏洞可绕过浏览器的安全隔离机制。",
    affectedProducts: ["Microsoft Edge", "Edge for Business"],
    publishedDate: "2024-02-28",
    lastUpdated: "2024-03-10",
    kbNumbers: ["KB5025733"],
    cvssScore: 9.1,
    workarounds: ["启用网站隔离", "禁用不信任的扩展", "更新浏览器到最新版本"],
  },
  {
    id: "CVE-2024-26074",
    title: "Azure DevOps 访问控制漏洞",
    severity: "Important",
    exploited: "No",
    description: "Azure DevOps 中存在访问控制漏洞，可能导致未授权访问项目资源。有特定条件下，非项目成员可以访问私有仓库。",
    affectedProducts: ["Azure DevOps", "Azure DevOps Server"],
    publishedDate: "2024-02-25",
    lastUpdated: "2024-03-08",
    kbNumbers: ["KB5025734"],
    cvssScore: 6.8,
    workarounds: ["审查项目权限", "启用高级安全功能", "应用最新更新"],
  },
  {
    id: "CVE-2024-26067",
    title: ".NET Framework 拒绝服务漏洞",
    severity: "Low",
    exploited: "No",
    description: ".NET Framework 中存在拒绝服务漏洞，可能导致应用程序崩溃。攻击者可以通过发送特制请求触发异常。",
    affectedProducts: [".NET Framework 4.8", ".NET 6.0", ".NET 7.0"],
    publishedDate: "2024-02-20",
    lastUpdated: "2024-03-05",
    kbNumbers: ["KB5025735"],
    cvssScore: 5.3,
    workarounds: ["应用异常处理", "更新运行时", "配置请求验证"],
  },
  {
    id: "CVE-2024-26054",
    title: "OneDrive 权限提升漏洞",
    severity: "Important",
    exploited: "No",
    description: "OneDrive 客户端中存在权限提升漏洞，本地攻击者可能获得更高权限。此漏洞与文件同步组件有关。",
    affectedProducts: ["OneDrive", "OneDrive for Business", "SharePoint Online"],
    publishedDate: "2024-02-15",
    lastUpdated: "2024-03-01",
    kbNumbers: ["KB5025736"],
    cvssScore: 7.0,
    workarounds: ["更新客户端", "限制本地应用权限", "监控异常活动"],
  }
]; 

// 用于添加更多随机生成的漏洞数据的生成器函数
export function generateRandomVulnerability(count: number): Vulnerability[] {
  const result: Vulnerability[] = [];
  
  for (let i = 0; i < count; i++) {
    // 随机选择严重性级别，确保各级别都有数据
    let severityLevel: SeverityLevel;
    const severityRandom = Math.random();
    if (severityRandom < 0.25) {
      severityLevel = "Critical";
    } else if (severityRandom < 0.5) {
      severityLevel = "Important";
    } else if (severityRandom < 0.75) {
      severityLevel = "Moderate";
    } else {
      severityLevel = "Low";
    }
    
    const isExploited: ExploitedStatus = Math.random() < 0.25 ? "Yes" : "No";
    const impactType = IMPACT_TYPES[Math.floor(Math.random() * IMPACT_TYPES.length)];
    
    // 随机选择2-4个受影响产品
    const randomProducts: string[] = [];
    const productCount = Math.floor(Math.random() * 3) + 2;
    
    for (let j = 0; j < productCount; j++) {
      const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      if (!randomProducts.includes(randomProduct)) {
        randomProducts.push(randomProduct);
      }
    }
    
    // 生成随机的CVE编号 - 2024年，最近几个月
    const cveId = `CVE-2024-${20000 + Math.floor(Math.random() * 6000)}`;
    
    // 生成随机的发布日期 - 最近3个月内
    const today = new Date();
    const randomDaysAgo = Math.floor(Math.random() * 90);
    const publishDate = new Date(today);
    publishDate.setDate(today.getDate() - randomDaysAgo);
    
    // 生成更新日期 - 发布后1-14天
    const updateDate = new Date(publishDate);
    updateDate.setDate(publishDate.getDate() + Math.floor(Math.random() * 14) + 1);
    
    // 生成KB编号
    const kbNumber = `KB${5020000 + Math.floor(Math.random() * 10000)}`;
    
    // 生成CVSS分数 - 根据严重性级别
    let cvssScore = 0;
    if (severityLevel === "Critical") {
      cvssScore = 8.0 + Math.random() * 2.0;
    } else if (severityLevel === "Important") {
      cvssScore = 6.0 + Math.random() * 2.0;
    } else if (severityLevel === "Moderate") {
      cvssScore = 4.0 + Math.random() * 2.0;
    } else {
      cvssScore = 2.0 + Math.random() * 2.0;
    }
    
    // 创建漏洞记录
    result.push({
      id: cveId,
      title: `${randomProducts[0]} ${impactType.replace(" ", " ")}漏洞`,
      severity: severityLevel,
      exploited: isExploited,
      description: `${randomProducts[0]}中存在${getImpactChineseFromEnglish(impactType)}漏洞，可能导致安全风险。${isExploited === "Yes" ? "此漏洞已在野外被利用。" : ""}`,
      affectedProducts: randomProducts,
      publishedDate: publishDate.toISOString().split('T')[0],
      lastUpdated: updateDate.toISOString().split('T')[0],
      kbNumbers: [kbNumber],
      cvssScore: parseFloat(cvssScore.toFixed(1)),
      workarounds: ["安装最新安全补丁", "关注官方公告"]
    });
  }
  
  return result;
}

// 添加中文翻译辅助函数
function getImpactChineseFromEnglish(impact: string): string {
  const map: {[key: string]: string} = {
    "Remote Code Execution": "远程代码执行",
    "Elevation of Privilege": "特权提升",
    "Information Disclosure": "信息泄露",
    "Denial of Service": "拒绝服务",
    "Spoofing": "欺骗",
    "Tampering": "篡改",
    "Security Feature Bypass": "安全功能绕过"
  };
  return map[impact] || impact;
}

// 合并基础数据和额外生成的随机数据
export const extendedMockVulnerabilities = [...mockVulnerabilities, ...generateRandomVulnerability(30)]; 