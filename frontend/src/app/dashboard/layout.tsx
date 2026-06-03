"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Hexagon, LayoutDashboard, Mic, FileText, DollarSign, Settings, Search, Bell, Activity } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex h-screen bg-[#0F1F2E] font-inter text-white overflow-hidden">



      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">

        <header className="h-20 bg-[#0F1F2E] border-b border-white/5 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold">
              <Hexagon className="text-opti-lime" size={28} />
              <span>AI WorkSync</span>
            </Link>

            <div className="hidden md:flex items-center gap-2 text-xs text-gray-400 ml-4 pl-4 border-l border-white/10">
              <Activity className="w-3 h-3" />
              <Link href="/#intelligence" className="hover:text-white hover:underline transition-colors">Work Intelligence</Link>
              <span className="text-gray-600">&gt;</span>
              <span className="text-white font-semibold">
                {pathname === '/dashboard/intelligence/voice-capture' ? 'Voice Capture' :
                  pathname === '/dashboard' ? 'Dashboard' : 'Overview'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search logs, projects..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-[#071420] text-white border border-white/10 rounded-full focus:bg-[#152737] focus:border-opti-lime focus:ring-1 focus:ring-opti-lime outline-none transition-all placeholder:text-gray-500"
              />
            </div>

            <button className="relative p-2 text-gray-400 hover:text-white transition-all">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0F1F2E]"></span>
            </button>
            <button className="bg-opti-lime text-opti-dark font-medium px-5 py-2 rounded-full hover:bg-opti-lime-hover transition-all flex items-center gap-2 text-sm">
              <Mic size={16} /> Quick Record
            </button>
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
