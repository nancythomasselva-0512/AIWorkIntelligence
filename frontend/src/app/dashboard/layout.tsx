"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Hexagon, LayoutDashboard, Mic, FileText, DollarSign, Settings, Search, Bell, Activity, ArrowLeft, Plus, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../../providers/ThemeProvider';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (!token) {
        router.push('/login');
        return;
      }

      setIsCheckingAuth(false);
    }
  }, [pathname, router]);

  if (isCheckingAuth) {
    return (
      <div className="flex h-screen w-screen bg-[#071420] items-center justify-center text-opti-lime text-xl font-bold font-inter relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-opti-lime/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-opti-lime/5 rounded-full blur-[100px]"></div>
        <div className="flex flex-col items-center gap-4 relative z-10">
          <Hexagon className="text-opti-lime w-12 h-12 animate-spin" style={{ animationDuration: '3s' }} />
          <span className="animate-pulse">Syncing AI Workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0F1F2E] font-inter text-white overflow-hidden">



      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">

        <header className="h-20 bg-[#0F1F2E] border-b border-white/5 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.push('/')}
              className="w-10 h-10 rounded-full bg-[#071420] border border-white/10 flex items-center justify-center text-gray-400 hover:text-opti-lime hover:border-opti-lime/50 hover:bg-opti-lime/5 transition-all duration-300 group hover:shadow-[0_0_15px_rgba(199,242,58,0.15)]"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            </button>
            <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold">
              <Hexagon className="text-opti-lime" size={28} />
              <span>AI WorkSync</span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard/reports" className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-opti-lime/50">
              <FileText size={16} /> Reports
            </Link>

            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search logs, projects..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-[#071420] text-white border border-white/10 rounded-full focus:bg-[#152737] focus:border-opti-lime focus:ring-1 focus:ring-opti-lime outline-none transition-all placeholder:text-gray-500"
              />
            </div>

            <button onClick={toggleTheme} className="relative p-2 text-gray-400 hover:text-white transition-all">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="relative p-2 text-gray-400 hover:text-white transition-all">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0F1F2E]"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-[#152737] border border-white/10 flex items-center justify-center text-white cursor-pointer hover:border-opti-lime transition-all">
              <User size={18} />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8 bg-[#071420]">
          {children}
        </div>
      </main>
    </div>
  );
}
