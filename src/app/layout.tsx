import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Microsoft Update PatchGallery",
  description: "A platform for displaying Windows update patch information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
