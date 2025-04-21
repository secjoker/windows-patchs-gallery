import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <Image 
                src="https://img.icons8.com/fluent/48/000000/windows-10.png" 
                alt="Logo" 
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <h3 className="ml-2 text-lg font-bold">Microsoft Update PatchGallery</h3>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              本平台提供Windows系统更新补丁的可视化展示，帮助IT管理员和安全从业者及时获取并应用系统安全更新。
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-3">快速链接</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition">
                    首页
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-gray-400 hover:text-white transition">
                    安全公告
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-gray-400 hover:text-white transition">
                    补丁检索
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition">
                    关于我们
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-3">相关资源</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://msrc.microsoft.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Microsoft安全响应中心
                  </a>
                </li>
                <li>
                  <a 
                    href="https://learn.microsoft.com/zh-cn/security/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Microsoft安全文档
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.microsoft.com/en-us/security/blog/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Microsoft安全博客
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Microsoft Update PatchGallery. 保留所有权利。</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 