import { cn } from "@/lib/utils";

export type SeverityLevel = "Critical" | "Important" | "Moderate" | "Low";

export interface SeverityIndicatorProps {
  severity: SeverityLevel;
  baseScore?: number;
  showLabel?: boolean;
  showScore?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  darkMode?: boolean;
}

const getSeverityColor = (severity: SeverityLevel, darkMode: boolean = false): string => {
  switch (severity) {
    case "Critical":
      return darkMode ? "bg-red-500/80" : "bg-red-600";
    case "Important":
      return darkMode ? "bg-orange-500/80" : "bg-orange-600";
    case "Moderate":
      return darkMode ? "bg-yellow-500/80" : "bg-yellow-600";
    case "Low":
      return darkMode ? "bg-blue-500/80" : "bg-blue-600";
    default:
      return darkMode ? "bg-gray-500/80" : "bg-gray-600";
  }
};

const getSeverityTextColor = (severity: SeverityLevel, darkMode: boolean = false): string => {
  switch (severity) {
    case "Critical":
      return darkMode ? "text-red-400" : "text-red-600";
    case "Important":
      return darkMode ? "text-orange-400" : "text-orange-600";
    case "Moderate":
      return darkMode ? "text-yellow-400" : "text-yellow-600";
    case "Low":
      return darkMode ? "text-blue-400" : "text-blue-600";
    default:
      return darkMode ? "text-gray-400" : "text-gray-600";
  }
};

const getSizeClasses = (size: "sm" | "md" | "lg"): { indicator: string, label: string, score: string } => {
  switch (size) {
    case "sm":
      return {
        indicator: "h-2 w-16",
        label: "text-xs",
        score: "text-xs"
      };
    case "lg":
      return {
        indicator: "h-4 w-24",
        label: "text-base",
        score: "text-base"
      };
    case "md":
    default:
      return {
        indicator: "h-3 w-20",
        label: "text-sm",
        score: "text-sm"
      };
  }
};

const SeverityIndicator = ({
  severity,
  baseScore,
  showLabel = true,
  showScore = true,
  size = "md",
  className = "",
  darkMode = false
}: SeverityIndicatorProps) => {
  const severityColor = getSeverityColor(severity, darkMode);
  const textColor = getSeverityTextColor(severity, darkMode);
  const sizeClasses = getSizeClasses(size);
  
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className={cn("font-medium", sizeClasses.label, textColor)}>
            {severity}
          </span>
          {showScore && baseScore !== undefined && (
            <span className={cn(
              sizeClasses.score, 
              darkMode ? "text-gray-400" : "text-gray-600"
            )}>
              {baseScore.toFixed(1)}
            </span>
          )}
        </div>
      )}
      
      <div className={cn(
        "rounded-full overflow-hidden bg-opacity-20",
        darkMode ? "bg-gray-700" : "bg-gray-200",
        sizeClasses.indicator
      )}>
        <div 
          className={cn("h-full rounded-full", severityColor)}
          style={{ 
            width: baseScore !== undefined 
              ? `${Math.min(baseScore * 10, 100)}%` 
              : severity === "Critical" 
                ? "100%" 
                : severity === "Important" 
                  ? "75%" 
                  : severity === "Moderate" 
                    ? "50%" 
                    : "25%" 
          }}
        />
      </div>
    </div>
  );
};

// 带有图标的扩展版本
export const SeverityBadge = ({
  severity,
  darkMode = false,
  className = ""
}: {
  severity: SeverityLevel;
  darkMode?: boolean;
  className?: string;
}) => {
  const getIconAndClass = () => {
    switch (severity) {
      case "Critical":
        return {
          icon: <CriticalIcon darkMode={darkMode} />,
          class: darkMode ? "bg-red-900/50 text-red-300" : "bg-red-50 text-red-600"
        };
      case "Important":
        return {
          icon: <ImportantIcon darkMode={darkMode} />,
          class: darkMode ? "bg-orange-900/50 text-orange-300" : "bg-orange-50 text-orange-600"
        };
      case "Moderate":
        return {
          icon: <ModerateIcon darkMode={darkMode} />,
          class: darkMode ? "bg-yellow-900/50 text-yellow-300" : "bg-yellow-50 text-yellow-600"
        };
      case "Low":
        return {
          icon: <LowIcon darkMode={darkMode} />,
          class: darkMode ? "bg-blue-900/50 text-blue-300" : "bg-blue-50 text-blue-600"
        };
      default:
        return {
          icon: null,
          class: darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"
        };
    }
  };

  const { icon, class: badgeClass } = getIconAndClass();

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium",
      badgeClass,
      className
    )}>
      {icon}
      {severity}
    </div>
  );
};

// 图标组件
const CriticalIcon = ({ darkMode }: { darkMode: boolean }) => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={darkMode ? "text-red-300" : "text-red-600"}
  >
    <path d="m8 2 1.88 1.88"></path>
    <path d="M14.12 3.88 16 2"></path>
    <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path>
    <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6z"></path>
    <path d="M12 20v-9"></path>
    <path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path>
    <path d="M6 13H2"></path>
    <path d="M3 21c0-2.1 1.7-3.9 3.8-4"></path>
    <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"></path>
    <path d="M22 13h-4"></path>
    <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"></path>
  </svg>
);

const ImportantIcon = ({ darkMode }: { darkMode: boolean }) => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={darkMode ? "text-orange-300" : "text-orange-600"}
  >
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const ModerateIcon = ({ darkMode }: { darkMode: boolean }) => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={darkMode ? "text-yellow-300" : "text-yellow-600"}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const LowIcon = ({ darkMode }: { darkMode: boolean }) => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={darkMode ? "text-blue-300" : "text-blue-600"}
  >
    <path d="M12 9v4"></path>
    <path d="M12 17h.01"></path>
    <path d="M3.34 17a10 10 0 1 1 17.32 0"></path>
  </svg>
);

export default SeverityIndicator; 