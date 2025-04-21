"use client"

import Image from "next/image"
import { SearchFilters } from "./search-filters"

export function Hero() {
  return (
    <div className="relative min-h-[85vh] w-full flex flex-col justify-center items-center">
      {/* 背景图片 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
        <Image
          className="object-cover"
          src="https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Background"
          fill
          priority
          sizes="100vw"
          quality={85}
        />
      </div>
      
      {/* 内容区域 */}
      <div className="container mx-auto relative z-20 text-center px-4 py-16">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white animate-fadeIn">
          Windows 更新补丁信息中心
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white opacity-90 animate-fadeIn animation-delay-200">
          实时掌握 Windows 系统更新与安全补丁信息，保护您的设备安全
        </p>
        
        {/* 搜索过滤器 */}
        <div className="w-full max-w-4xl mx-auto">
          <SearchFilters />
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  )
} 