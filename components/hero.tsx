"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <div className="relative min-h-[85vh] w-full flex flex-col justify-center items-center overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 z-10" />
        <Image
          className="object-cover transition-transform duration-10000 hover:scale-105"
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="数字安全背景"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          quality={90}
        />
      </div>
      
      {/* 内容区域 */}
      <motion.div 
        className="container mx-auto relative z-20 text-center px-4 py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Windows 更新补丁信息中心
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white opacity-90 drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          实时掌握 Windows 系统更新与安全补丁信息，保护您的设备安全
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#vulnerability-list" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-lg font-medium text-white shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary">
            浏览漏洞列表
          </a>
          <a href="#search-filters" className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 backdrop-blur-sm px-6 py-3 text-lg font-medium text-white shadow hover:bg-white/20 transition-colors">
            搜索更新补丁
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
} 