"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // 初始状态函数
  const initialize = (): T => {
    if (typeof window === "undefined") {
      return initialValue
    }
    
    try {
      // 从 localStorage 获取值
      const item = window.localStorage.getItem(key)
      // 如果值存在则解析，否则返回初始值
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // 如果错误则返回初始值
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  }

  // 状态管理
  const [storedValue, setStoredValue] = useState<T>(initialize)

  // 设置新值到 localStorage 的函数
  const setValue = (value: T) => {
    try {
      // 允许值为函数
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      // 保存状态
      setStoredValue(valueToStore)
      
      // 保存到 localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  // 监听其他标签页的存储事件
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        setStoredValue(JSON.parse(event.newValue))
      }
    }
    
    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange)
      return () => {
        window.removeEventListener("storage", handleStorageChange)
      }
    }
  }, [key])

  return [storedValue, setValue]
} 