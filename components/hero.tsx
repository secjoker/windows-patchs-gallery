export function Hero() {
  return (
    <header className="hero min-h-screen flex flex-col justify-center items-center px-4 md:px-8 text-white pt-16">
      <div className="container mx-auto text-center py-24">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
          Windows 更新补丁信息中心
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          实时掌握 Windows 系统更新与安全补丁信息，保护您的设备安全
        </p>
      </div>
      
      <style jsx>{`
        .hero {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
                      url('https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') 
                      no-repeat center center;
          background-size: cover;
        }
      `}</style>
    </header>
  )
} 