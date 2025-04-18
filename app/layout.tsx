import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Microsoft Update PatchGallery - Windows 更新补丁信息展示平台',
  description: '实时掌握 Windows 系统更新与安全补丁信息，保护您的设备安全',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://lf6-cdn-tos.bytecdntp.com/cdn/expire-100-M/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="bg-slate-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">Microsoft Update PatchGallery</h1>
              <nav>
                <ul className="flex space-x-4">
                  <li><a href="/" className="hover:text-blue-300">Home</a></li>
                  <li><a href="/about" className="hover:text-blue-300">About</a></li>
                </ul>
              </nav>
            </div>
          </header>
          {children}
          <footer className="bg-slate-900 text-white p-4 mt-8">
            <div className="container mx-auto text-center">
              <p>© {new Date().getFullYear()} Microsoft Update PatchGallery</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
