"use client"

import * as React from "react"
import { format, subDays } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DatePickerWithRangeProps {
  className?: string
  value: DateRange
  onChange?: (dateRange: DateRange | undefined) => void
  maxRange?: number // 最大可选择的天数
  onRangeError?: (error: string) => void // 范围错误回调
  errorMessage?: string // 新增：错误消息属性
}

interface PresetRange {
  label: string
  getValue: () => DateRange
}

export function DatePickerWithRange({
  className,
  value,
  onChange,
  maxRange,
  onRangeError,
  errorMessage,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(value || {
    from: new Date(2024, 4, 1), // May 1, 2024
    to: new Date(), // Today
  })

  const presets: PresetRange[] = [
    {
      label: "最近7天",
      getValue: () => ({
        from: subDays(new Date(), 7),
        to: new Date(),
      }),
    },
    {
      label: "最近30天",
      getValue: () => ({
        from: subDays(new Date(), 30),
        to: new Date(),
      }),
    },
    {
      label: "最近90天",
      getValue: () => ({
        from: subDays(new Date(), 90),
        to: new Date(),
      }),
    },
  ]

  // 检查日期范围是否超过限制
  const checkDateRange = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to || !maxRange) return true;
    const diffTime = Math.abs(range.to.getTime() - range.from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= maxRange;
  };

  // 处理预设范围选择
  const handlePresetSelect = (preset: PresetRange) => {
    const newRange = preset.getValue();
    if (maxRange && !checkDateRange(newRange)) {
      onRangeError?.(`日期范围不能超过 ${maxRange} 天`);
      return;
    }
    setDate(newRange);
    onChange?.(newRange);
  };

  // 只在本地状态改变时调用 onChange
  const handleSelect = (newDate: DateRange | undefined) => {
    if (maxRange && newDate?.from && newDate?.to) {
      const isValid = checkDateRange(newDate);
      if (!isValid) {
        onRangeError?.(`日期范围不能超过 ${maxRange} 天`);
        return;
      }
    }
    setDate(newDate);
    onChange?.(newDate);
  };

  // 当外部 value 改变时更新本地状态
  React.useEffect(() => {
    if (value && JSON.stringify(value) !== JSON.stringify(date)) {
      if (maxRange && !checkDateRange(value)) {
        onRangeError?.(`日期范围不能超过 ${maxRange} 天`);
        return;
      }
      setDate(value);
    }
  }, [value, maxRange, onRangeError]);

  return (
    <div className={cn("grid gap-2", className)}>
      {errorMessage && (
        <Alert variant="destructive" className="mb-2">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-wrap gap-2 mb-2">
        {presets.map((preset) => (
          <Button
            key={preset.label}
            variant="outline"
            size="sm"
            onClick={() => handlePresetSelect(preset)}
          >
            {preset.label}
          </Button>
        ))}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
