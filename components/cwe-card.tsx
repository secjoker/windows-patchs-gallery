import { cn } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface CWEInfo {
  cweId: string;
  name: string;
  description?: string;
  likelihood?: "High" | "Medium" | "Low";
  impact?: "High" | "Medium" | "Low";
  categories?: string[];
  url?: string;
}

export interface CWECardProps {
  cwe: CWEInfo;
  compact?: boolean;
  showDescription?: boolean;
  darkMode?: boolean;
  className?: string;
}

const getLikelihoodColor = (likelihood: string, darkMode: boolean): string => {
  switch (likelihood) {
    case "High":
      return darkMode ? "text-red-400" : "text-red-600";
    case "Medium":
      return darkMode ? "text-orange-400" : "text-orange-600";
    case "Low":
      return darkMode ? "text-green-400" : "text-green-600";
    default:
      return darkMode ? "text-gray-400" : "text-gray-600";
  }
};

const getImpactColor = (impact: string, darkMode: boolean): string => {
  switch (impact) {
    case "High":
      return darkMode ? "text-red-400" : "text-red-600";
    case "Medium":
      return darkMode ? "text-orange-400" : "text-orange-600";
    case "Low":
      return darkMode ? "text-green-400" : "text-green-600";
    default:
      return darkMode ? "text-gray-400" : "text-gray-600";
  }
};

const getCategoryBadgeClass = (darkMode: boolean): string => {
  return darkMode 
    ? "bg-gray-800 text-gray-300 hover:bg-gray-700" 
    : "bg-gray-100 text-gray-700 hover:bg-gray-200";
};

const CWECard = ({
  cwe,
  compact = false,
  showDescription = true,
  darkMode = false,
  className = ""
}: CWECardProps) => {
  const likelihoodColor = cwe.likelihood ? getLikelihoodColor(cwe.likelihood, darkMode) : "";
  const impactColor = cwe.impact ? getImpactColor(cwe.impact, darkMode) : "";
  const categoryBadgeClass = getCategoryBadgeClass(darkMode);
  
  return (
    <div className={cn(
      "rounded-lg p-4",
      darkMode ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-200 shadow-sm",
      className
    )}>
      <div className="flex flex-row items-start justify-between">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={cn(
              "font-medium",
              darkMode ? "text-gray-100" : "text-gray-900",
              compact ? "text-sm" : "text-base"
            )}>
              CWE-{cwe.cweId}
            </h3>
            {cwe.url && (
              <Link
                href={cwe.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center hover:underline",
                  darkMode ? "text-blue-400" : "text-blue-600"
                )}
              >
                <ExternalLink size={compact ? 14 : 16} className="ml-1" />
              </Link>
            )}
          </div>
          
          <p className={cn(
            "font-medium mb-2",
            darkMode ? "text-gray-300" : "text-gray-700",
            compact ? "text-sm" : "text-base"
          )}>
            {cwe.name}
          </p>
          
          {showDescription && cwe.description && (
            <p className={cn(
              "mt-2",
              darkMode ? "text-gray-400" : "text-gray-600",
              compact ? "text-xs" : "text-sm"
            )}>
              {cwe.description}
            </p>
          )}
        </div>
      </div>
      
      {(!compact || !showDescription) && (
        <div className="flex flex-wrap gap-4 mt-3">
          {cwe.likelihood && (
            <div className="flex flex-col">
              <span className={cn(
                "text-xs",
                darkMode ? "text-gray-400" : "text-gray-500"
              )}>
                可能性
              </span>
              <span className={cn(
                "text-sm font-medium",
                likelihoodColor
              )}>
                {cwe.likelihood}
              </span>
            </div>
          )}
          
          {cwe.impact && (
            <div className="flex flex-col">
              <span className={cn(
                "text-xs",
                darkMode ? "text-gray-400" : "text-gray-500"
              )}>
                影响
              </span>
              <span className={cn(
                "text-sm font-medium",
                impactColor
              )}>
                {cwe.impact}
              </span>
            </div>
          )}
        </div>
      )}
      
      {cwe.categories && cwe.categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {cwe.categories.map((category, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={cn(
                "text-xs",
                categoryBadgeClass
              )}
            >
              {category}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default CWECard; 