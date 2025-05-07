import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReferenceLink {
  title: string;
  url: string;
  type: "MSRC" | "MITRE" | "CWE" | "NIST" | "OTHER";
  description?: string;
}

interface ReferenceLinkCategoryProps {
  links: ReferenceLink[];
  title: string;
  icon: React.ReactNode;
  isDarkMode?: boolean;
}

interface ReferenceLinksProps {
  links: ReferenceLink[];
  isDarkMode?: boolean;
}

const getLinkIconColor = (type: ReferenceLink['type'], isDarkMode: boolean): string => {
  switch(type) {
    case "MSRC": return isDarkMode ? "text-blue-400" : "text-blue-600";
    case "MITRE": return isDarkMode ? "text-purple-400" : "text-purple-600";
    case "CWE": return isDarkMode ? "text-amber-400" : "text-amber-600";
    case "NIST": return isDarkMode ? "text-emerald-400" : "text-emerald-600";
    case "OTHER": return isDarkMode ? "text-gray-400" : "text-gray-600";
  }
};

const ReferenceLinkCategory = ({ links, title, icon, isDarkMode = false }: ReferenceLinkCategoryProps) => {
  if (links.length === 0) return null;
  
  return (
    <div className={cn(
      "rounded-lg p-4 mb-4", 
      isDarkMode ? "bg-slate-800/70" : "bg-white shadow-sm"
    )}>
      <div className="flex items-center gap-2 mb-3">
        <div className={cn(
          "w-8 h-8 flex items-center justify-center rounded-full",
          isDarkMode ? "bg-slate-700" : "bg-slate-100"
        )}>
          {icon}
        </div>
        <h3 className={cn(
          "font-medium", 
          isDarkMode ? "text-slate-200" : "text-slate-800"
        )}>
          {title}
        </h3>
      </div>
      
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index} className={cn(
            "px-3 py-2 rounded-md transition-colors",
            isDarkMode 
              ? "hover:bg-slate-700/50" 
              : "hover:bg-slate-50"
          )}>
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start gap-2"
            >
              <ExternalLink className={cn(
                "mt-0.5 h-4 w-4 flex-shrink-0",
                getLinkIconColor(link.type, isDarkMode)
              )}/>
              <div>
                <span className={cn(
                  "font-medium", 
                  isDarkMode ? "text-slate-200" : "text-slate-800"
                )}>
                  {link.title}
                </span>
                {link.description && (
                  <p className={cn(
                    "text-sm mt-0.5", 
                    isDarkMode ? "text-slate-400" : "text-slate-600"
                  )}>
                    {link.description}
                  </p>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ReferenceLinks = ({ links, isDarkMode = false }: ReferenceLinksProps) => {
  // 将链接分组
  const msrcLinks = links.filter(link => link.type === "MSRC");
  const mitreLinks = links.filter(link => link.type === "MITRE");
  const cweLinks = links.filter(link => link.type === "CWE");
  const nistLinks = links.filter(link => link.type === "NIST");
  const otherLinks = links.filter(link => link.type === "OTHER");
  
  return (
    <div className="space-y-4">
      <ReferenceLinkCategory 
        links={msrcLinks}
        title="微软安全响应中心"
        icon={<MicrosoftIcon isDarkMode={isDarkMode} />}
        isDarkMode={isDarkMode}
      />
      
      <ReferenceLinkCategory 
        links={mitreLinks}
        title="MITRE CVE"
        icon={<MitreIcon isDarkMode={isDarkMode} />}
        isDarkMode={isDarkMode}
      />
      
      <ReferenceLinkCategory 
        links={cweLinks}
        title="常见弱点枚举 (CWE)"
        icon={<CWEIcon isDarkMode={isDarkMode} />}
        isDarkMode={isDarkMode}
      />
      
      <ReferenceLinkCategory 
        links={nistLinks}
        title="NIST 国家漏洞数据库"
        icon={<NISTIcon isDarkMode={isDarkMode} />}
        isDarkMode={isDarkMode}
      />
      
      {otherLinks.length > 0 && (
        <ReferenceLinkCategory 
          links={otherLinks}
          title="其他参考资料"
          icon={<OtherIcon isDarkMode={isDarkMode} />}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};

// 图标组件
const MicrosoftIcon = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <svg 
    className={isDarkMode ? "text-blue-400" : "text-blue-600"} 
    width="16" 
    height="16" 
    viewBox="0 0 23 23" 
    fill="currentColor"
  >
    <path d="M0 0h11v11H0z M12 0h11v11H12z M0 12h11v11H0z M12 12h11v11H12z"/>
  </svg>
);

const MitreIcon = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <svg 
    className={isDarkMode ? "text-purple-400" : "text-purple-600"} 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const CWEIcon = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <svg 
    className={isDarkMode ? "text-amber-400" : "text-amber-600"} 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
    <path d="M5 8h13a0 0 0 0 1 0 0v8a0 0 0 0 1 0 0H5a4 4 0 0 1-4-4 4 4 0 0 1 4-4Z"></path>
  </svg>
);

const NISTIcon = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <svg 
    className={isDarkMode ? "text-emerald-400" : "text-emerald-600"} 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
    <line x1="3" x2="21" y1="9" y2="9"></line>
    <line x1="3" x2="21" y1="15" y2="15"></line>
    <line x1="9" x2="9" y1="3" y2="21"></line>
    <line x1="15" x2="15" y1="3" y2="21"></line>
  </svg>
);

const OtherIcon = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <svg 
    className={isDarkMode ? "text-gray-400" : "text-gray-600"} 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" x2="12" y1="8" y2="16"></line>
    <line x1="8" x2="16" y1="12" y2="12"></line>
  </svg>
);

export default ReferenceLinks; 