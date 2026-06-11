"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FolderGit2, 
  DollarSign, 
  Building2, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  TrendingUp,
  Activity,
  ArrowRight,
  BrainCircuit,
  Calendar as CalendarIcon
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import api from '../../utils/api';

function Users(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}

function FileText(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
}

export default function MainDashboard() {
  const router = useRouter();
  const reportRef = React.useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [stats, setStats] = useState({
    projects: 0,
    revenue: '$45,231', // Future feature
    organizations: 8,   // Future feature
    pendingTasks: 0,
    completedTasks: 0
  });

  const [productivityData, setProductivityData] = useState<any[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<any[]>([]);
  const [aiInsights, setAiInsights] = useState({
    mostActiveProject: "None",
    productivityStatus: "Analyzing..."
  });

  const [revenueData] = useState([
    { name: 'Jan', revenue: 4000, expenses: 2400 },
    { name: 'Feb', revenue: 3000, expenses: 1398 },
    { name: 'Mar', revenue: 2000, expenses: 9800 },
    { name: 'Apr', revenue: 2780, expenses: 3908 },
    { name: 'May', revenue: 1890, expenses: 4800 },
    { name: 'Jun', revenue: 2390, expenses: 3800 },
    { name: 'Jul', revenue: 3490, expenses: 4300 },
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await api.get('/worklogs?limit=100');
      const allLogs = res.data.data || res.data || [];

      // Calculate Stats
      const pending = allLogs.filter((l: any) => l.status === 'PENDING').length;
      const completed = allLogs.filter((l: any) => l.status === 'COMPLETED').length;
      
      const categories = allLogs.map((l: any) => l.category).filter(Boolean);
      const uniqueProjects = new Set(categories).size;

      setStats(prev => ({
        ...prev,
        projects: uniqueProjects,
        pendingTasks: pending,
        completedTasks: completed
      }));

      // Calculate Productivity Data (Group by Day)
      const dayMap: { [key: string]: { tasks: number, hours: number } } = {
        'Mon': { tasks: 0, hours: 0 },
        'Tue': { tasks: 0, hours: 0 },
        'Wed': { tasks: 0, hours: 0 },
        'Thu': { tasks: 0, hours: 0 },
        'Fri': { tasks: 0, hours: 0 },
        'Sat': { tasks: 0, hours: 0 },
        'Sun': { tasks: 0, hours: 0 },
      };

      allLogs.forEach((log: any) => {
        const date = new Date(log.createdAt);
        const dayStr = date.toLocaleDateString('en-US', { weekday: 'short' });
        if (dayMap[dayStr]) {
          dayMap[dayStr].tasks += 1;
          dayMap[dayStr].hours += (parseFloat(log.hours) || 0);
        }
      });

      const formattedProductivity = Object.keys(dayMap).map(key => ({
        name: key,
        tasks: dayMap[key].tasks,
        hours: parseFloat(dayMap[key].hours.toFixed(1))
      }));
      setProductivityData(formattedProductivity);

      // Extract Timeline Events
      const recentLogs = allLogs.slice(0, 4);
      const events = recentLogs.map((log: any, index: number) => {
        let iconType: any = FileText;
        if (log.category?.toLowerCase().includes('meeting')) iconType = Users;
        else if (log.category?.toLowerCase().includes('voice')) iconType = BrainCircuit;

        return {
          id: log.id || index,
          title: log.textContent,
          time: new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'system',
          icon: iconType
        };
      });
      setTimelineEvents(events);

      // Basic AI Insights
      if (categories.length > 0) {
        const counts: any = {};
        categories.forEach((c: string) => { counts[c] = (counts[c] || 0) + 1; });
        const mostActive = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        setAiInsights({
          mostActiveProject: mostActive,
          productivityStatus: completed > pending ? "Excellent" : "Needs Attention"
        });
      }

    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!reportRef.current) return;
    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // higher resolution
        backgroundColor: '#071420', // match theme background
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('AI-WorkSync-Dashboard-Report.pdf');
    } catch (error) {
      console.error('Failed to generate PDF', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-opti-lime text-xl font-bold animate-pulse">Syncing AI Data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6" ref={reportRef}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-sm text-gray-400 mt-1">Welcome back. Here's what's happening today.</p>
        </div>
        <button 
          onClick={handleGenerateReport} 
          disabled={isGeneratingPdf}
          className="bg-opti-lime text-[#071420] px-4 py-2 rounded-lg font-medium hover:bg-[#a6cc2b] transition-colors flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CalendarIcon size={16} />
          {isGeneratingPdf ? 'Generating PDF...' : 'Generate Report'}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0F1F2E] border border-white/10 rounded-2xl p-5 hover:border-opti-lime/30 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <FolderGit2 size={20} />
            </div>
            <TrendingUp size={16} className="text-opti-lime" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.projects}</div>
          <div className="text-sm text-gray-400 mt-1">Active Projects</div>
        </div>

        <div className="bg-[#0F1F2E] border border-white/10 rounded-2xl p-5 hover:border-opti-lime/30 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-colors">
              <DollarSign size={20} />
            </div>
            <TrendingUp size={16} className="text-opti-lime" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.revenue}</div>
          <div className="text-sm text-gray-400 mt-1">Total Revenue</div>
        </div>

        <div className="bg-[#0F1F2E] border border-white/10 rounded-2xl p-5 hover:border-opti-lime/30 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <Building2 size={20} />
            </div>
            <span className="text-xs font-medium bg-white/5 text-gray-300 px-2 py-1 rounded-full">+2 this week</span>
          </div>
          <div className="text-3xl font-bold text-white">{stats.organizations}</div>
          <div className="text-sm text-gray-400 mt-1">Organizations</div>
        </div>

        <div className="bg-[#0F1F2E] border border-white/10 rounded-2xl p-5 hover:border-opti-lime/30 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <CheckCircle2 size={20} />
            </div>
            <Activity size={16} className="text-gray-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{stats.completedTasks}</span>
            <span className="text-sm text-gray-400">/ {stats.pendingTasks + stats.completedTasks}</span>
          </div>
          <div className="text-sm text-gray-400 mt-1">Tasks Completed</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue Overview Chart */}
        <div className="bg-[#0F1F2E] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Revenue Overview</h2>
            <select className="bg-[#071420] border border-white/10 text-xs text-gray-300 rounded-lg px-2 py-1 outline-none focus:border-opti-lime">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C7F23A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C7F23A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F1F2E', borderColor: '#ffffff20', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#C7F23A" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Productivity Analytics Chart */}
        <div className="bg-[#0F1F2E] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Productivity Analytics</h2>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-400"></div> Tasks</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-400"></div> Hours</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F1F2E', borderColor: '#ffffff20', borderRadius: '8px' }}
                  cursor={{ fill: '#ffffff05' }}
                />
                <Bar dataKey="tasks" fill="#60A5FA" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="hours" fill="#C084FC" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* AI & Timeline Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AI Insights Panel */}
        <div className="bg-[#0F1F2E] border border-white/10 rounded-2xl p-6 lg:col-span-1 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-opti-lime/10 blur-3xl -mr-10 -mt-10 rounded-full"></div>
          
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-opti-lime" size={20} />
            <h2 className="text-lg font-bold text-white">AI Insights</h2>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="bg-[#071420] border border-opti-lime/20 rounded-xl p-4 shadow-[0_0_15px_rgba(199,242,58,0.05)]">
              <p className="text-sm text-gray-300 leading-relaxed">
                Your productivity status is currently <strong className="text-opti-lime">{aiInsights.productivityStatus}</strong>. Most of your tasks are related to the <strong className="text-white">{aiInsights.mostActiveProject}</strong>.
              </p>
            </div>
            
            <div className="bg-[#071420] border border-white/5 rounded-xl p-4">
              <p className="text-sm text-gray-300 leading-relaxed">
                You have <strong className="text-red-400">3 overdue invoices</strong> totaling $4,500. Consider sending automated reminders.
              </p>
            </div>

            <div className="bg-[#071420] border border-white/5 rounded-xl p-4">
              <p className="text-sm text-gray-300 leading-relaxed">
                Based on your voice logs, you frequently mention <strong className="text-white">"Server Deployment"</strong>. Would you like to create a recurring project for this?
              </p>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-[#0F1F2E] border border-white/10 rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Recent Activity</h2>
            <Link href="/dashboard/intelligence/work-logs" className="text-sm text-opti-lime hover:underline cursor-pointer">View All</Link>
          </div>
          
          <div className="space-y-6">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className="flex gap-4 relative">
                {/* Connecting Line */}
                {index !== timelineEvents.length - 1 && (
                  <div className="absolute top-10 left-5 w-[1px] h-full bg-white/10"></div>
                )}
                
                <div className="w-10 h-10 rounded-full bg-[#071420] border border-white/10 flex items-center justify-center shrink-0 relative z-10">
                  <event.icon size={16} className={
                    event.type === 'meeting' ? 'text-blue-400' :
                    event.type === 'finance' ? 'text-green-400' :
                    event.type === 'ai' ? 'text-purple-400' : 'text-gray-400'
                  } />
                </div>
                
                <div className="pt-2 pb-1">
                  <p className="text-sm font-medium text-white">{event.title}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock size={12} /> {event.time}
                  </p>
                </div>
              </div>
            ))}
            {timelineEvents.length === 0 && (
              <div className="text-sm text-gray-400 italic">No recent activity found. Start tracking!</div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
