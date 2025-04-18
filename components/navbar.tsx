"use client"

import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="fixed w-full z-50 px-4 md:px-8 py-3 flex items-center justify-between bg-white dark:bg-gray-900 bg-opacity-95 dark:bg-opacity-95 shadow-md">
      <div className="flex items-center space-x-2 md:space-x-4">
        <Image 
          src="https://img.icons8.com/fluent/48/000000/windows-10.png" 
          alt="Logo" 
          width={40}
          height={40}
          className="w-8 h-8 md:w-10 md:h-10"
        />
        <div>
          <h1 className="text-lg md:text-xl font-bold">Microsoft Update PatchGallery</h1>
          <p className="text-xs md:text-sm opacity-70">Windows 更新补丁信息展示平台</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          <i className={`fas fa-${theme === "dark" ? "sun" : "moon"}`}></i>
        </Button>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/" className="text-sm md:text-base hover:text-blue-500 transition">
            首页
          </Link>
          <Link href="/latest" className="text-sm md:text-base hover:text-blue-500 transition">
            最新更新
          </Link>
          <Link href="/security" className="text-sm md:text-base hover:text-blue-500 transition">
            安全公告
          </Link>
          <Link href="/search" className="text-sm md:text-base hover:text-blue-500 transition">
            KB 搜索
          </Link>
        </div>
        
        <Button variant="ghost" size="icon" className="md:hidden">
          <i className="fas fa-bars"></i>
        </Button>
      </div>
    </nav>
  )
} 