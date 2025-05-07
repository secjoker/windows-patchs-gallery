import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  type?: "discovery" | "disclosure" | "patch" | "exploit" | "other";
  metadata?: Record<string, any>;
}

export interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
  darkMode?: boolean;
}

const getEventTypeColor = (type: string, darkMode: boolean): string => {
  switch (type) {
    case "discovery":
      return darkMode ? "bg-blue-500" : "bg-blue-600";
    case "disclosure":
      return darkMode ? "bg-amber-500" : "bg-amber-600";
    case "patch":
      return darkMode ? "bg-green-500" : "bg-green-600";
    case "exploit":
      return darkMode ? "bg-red-500" : "bg-red-600";
    default:
      return darkMode ? "bg-gray-500" : "bg-gray-600";
  }
};

export const Timeline = ({ 
  events = [], 
  className,
  darkMode = false
}: TimelineProps) => {
  // 按日期排序事件
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className={cn("relative", className)}>
      {sortedEvents.length === 0 ? (
        <div className={cn(
          "text-center py-4",
          darkMode ? "text-gray-400" : "text-gray-500"
        )}>
          暂无时间线数据
        </div>
      ) : (
        <div className="relative ml-3">
          {/* 垂直线 */}
          <div
            className={cn(
              "absolute left-7 top-0 h-full w-0.5 -ml-px",
              darkMode ? "bg-gray-700" : "bg-gray-200"
            )}
          />

          {sortedEvents.map((event, index) => (
            <div key={event.id} className="relative pb-8">
              {/* 隐藏最后一个事件之后的垂直线 */}
              {index === sortedEvents.length - 1 && (
                <div
                  className={cn(
                    "absolute left-7 top-5 h-full w-0.5 -ml-px",
                    darkMode ? "bg-gray-900" : "bg-white"
                  )}
                />
              )}

              <div className="relative flex items-start space-x-3">
                {/* 时间点标记 */}
                <div className="relative">
                  <div className={cn(
                    "h-14 w-14 rounded-full border-4 flex items-center justify-center",
                    getEventTypeColor(event.type || "other", darkMode),
                    darkMode ? "border-gray-900" : "border-white"
                  )}>
                    {event.icon ? (
                      event.icon
                    ) : (
                      <span className="text-white text-xs font-medium">
                        {format(event.date, "MM/dd")}
                      </span>
                    )}
                  </div>
                </div>

                {/* 内容 */}
                <div className={cn(
                  "min-w-0 flex-1 py-1.5",
                  darkMode ? "text-white" : "text-black"
                )}>
                  <div className="text-sm">
                    <span className={cn(
                      "font-medium",
                      darkMode ? "text-gray-100" : "text-gray-900"
                    )}>
                      {event.title}
                    </span>
                    <span className={cn(
                      "ml-2 whitespace-nowrap text-sm",
                      darkMode ? "text-gray-400" : "text-gray-500"
                    )}>
                      {format(event.date, "yyyy年MM月dd日", { locale: zhCN })}
                    </span>
                  </div>
                  
                  {event.description && (
                    <div className={cn(
                      "mt-1 text-sm",
                      darkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      {event.description}
                    </div>
                  )}

                  {/* 附加信息 */}
                  {event.metadata && Object.keys(event.metadata).length > 0 && (
                    <div className={cn(
                      "mt-2 p-2 rounded",
                      darkMode ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      {Object.entries(event.metadata).map(([key, value]) => (
                        <div key={key} className="text-xs flex">
                          <span className={cn(
                            "font-medium mr-2",
                            darkMode ? "text-gray-400" : "text-gray-600"
                          )}>
                            {key}:
                          </span>
                          <span className={cn(
                            darkMode ? "text-gray-300" : "text-gray-700"
                          )}>
                            {String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeline; 