"use client";
import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, CheckCircle, Clock, Leaf, Mic, StopCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function DashboardPage() {
  const [worklogs, setWorklogs] = useState<any[]>([]);
  const fetchLogs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/worklogs?limit=5`);
      setWorklogs(res.data.data || res.data || []);
    } catch (err) {
      console.error("Failed to fetch worklogs", err);
    }
  };



  useEffect(() => {
    fetchLogs();
  }, []);
  return (
    <div className="max-w-7xl mx-auto">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-opti-dark mb-2 font-outfit">Welcome back, Admin 👋</h1>
        <p className="text-slate-500">Here is what's happening with your projects and revenue today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-opti-lime/10 rounded-full"></div>
          <div className="flex justify-between items-start">
            <div className="text-slate-500 font-medium">Total Revenue</div>
            <div className="w-10 h-10 rounded-full bg-opti-lime/20 flex items-center justify-center text-opti-lime">
              <TrendingUp size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-opti-dark mb-1">$124,543.00</div>
            <div className="text-sm text-green-500 flex items-center gap-1 font-medium">+14% from last month</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="text-slate-500 font-medium">Active Projects</div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Users size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-opti-dark mb-1">24</div>
            <div className="text-sm text-slate-500 font-medium">Across 4 organizations</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="text-slate-500 font-medium">AI Tasks Logged</div>
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <CheckCircle size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-opti-dark mb-1">156</div>
            <div className="text-sm text-green-500 flex items-center gap-1 font-medium">+22% productivity</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-40">
          <div className="flex justify-between items-start">
            <div className="text-slate-500 font-medium">Pending Invoices</div>
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <Clock size={20} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-opti-dark mb-1">$12,450.00</div>
            <div className="text-sm text-orange-500 font-medium">4 invoices awaiting payment</div>
          </div>
        </div>

      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-8">
        
        {/* Left Col (2 spans) */}
        <div className="col-span-2 flex flex-col gap-8">
           
           {/* Chart Placeholder */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-96 flex flex-col">
              <h3 className="text-lg font-bold text-opti-dark mb-6 font-outfit">Revenue Overview (with GST)</h3>
              <div className="flex-1 flex items-end gap-4 pb-4">
                 {/* Fake Chart Bars */}
                 {[40, 65, 45, 80, 50, 90, 75, 100, 60, 85, 70, 95].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2 group cursor-pointer">
                      <div className="w-full bg-slate-100 rounded-t-md relative overflow-hidden group-hover:bg-slate-200 transition-all" style={{ height: '100%' }}>
                         <div className="absolute bottom-0 w-full bg-opti-slate rounded-t-md transition-all group-hover:bg-opti-dark" style={{ height: `${h}%` }}></div>
                         <div className="absolute bottom-0 w-full bg-opti-lime rounded-t-md opacity-80" style={{ height: `${h * 0.2}%` }}></div>
                      </div>
                      <div className="text-xs text-slate-400 font-medium">M{i+1}</div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Recent AI Logs */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-opti-dark font-outfit">Recent AI Work Logs</h3>
                <button className="text-sm text-opti-lime font-medium hover:underline">View All</button>
              </div>

              <div className="flex flex-col gap-4">
                 {worklogs.length > 0 ? worklogs.map((log: any, i: number) => (
                    <div key={i} className="p-4 border border-slate-100 rounded-xl hover:shadow-md transition-all cursor-pointer">
                       <p className="text-slate-700 font-medium mb-3">{log.textContent || log.text || "No description"}</p>
                       <div className="flex justify-between items-center">
                         <div className="flex gap-2">
                           <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md font-medium">{log.category || 'General'}</span>
                         </div>
                         <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                           <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md">{log.organizationId ? 'Client' : 'Internal'}</span>
                           <span>{new Date(log.createdAt || Date.now()).toLocaleDateString()}</span>
                         </div>
                       </div>
                    </div>
                 )) : (
                    <div className="text-slate-500 text-sm text-center py-4">No recent work logs found. Say something in the Voice Capture!</div>
                 )}
              </div>
           </div>

        </div>

        {/* Right Col (1 span) */}
        <div className="col-span-1 flex flex-col gap-8">
           
           {/* Voice Capture Widget Link */}
           <div className="bg-[#0F1F2E] rounded-2xl p-8 shadow-xl relative border border-white/10 flex flex-col items-center group overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-opti-lime/10 blur-3xl rounded-full"></div>
             
             <div className="mb-6 relative z-10">
               <a 
                 href="/dashboard/intelligence/voice-capture"
                 className="flex items-center justify-center w-20 h-20 rounded-full bg-[#071420] text-white border border-white/10 shadow-lg group-hover:scale-105 group-hover:border-[#C7F23A] group-hover:text-[#C7F23A] transition-all duration-300"
               >
                 <Mic className="w-8 h-8" />
               </a>
             </div>

             <h3 className="text-xl font-extrabold text-white tracking-tight mb-2 text-center relative z-10 group-hover:text-[#C7F23A] transition-colors">
               Launch Voice Capture
             </h3>
             
             <p className="text-xs text-gray-400 font-medium text-center relative z-10">
               Voice intelligence has been moved to a dedicated command center.
             </p>
             
             <a href="/dashboard/intelligence/voice-capture" className="mt-6 px-6 py-2.5 bg-[#C7F23A] text-[#071420] text-sm font-bold rounded-full shadow-lg hover:shadow-[0_0_15px_rgba(199,242,58,0.3)] transition-all relative z-10">
               Open Module
             </a>
           </div>

           {/* AI Intelligence Insights */}
           <div className="bg-opti-dark text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
             <div className="absolute -right-10 -top-10 w-32 h-32 bg-opti-lime/20 blur-2xl rounded-full"></div>
             <h3 className="text-lg font-bold text-white mb-6 font-outfit flex items-center gap-2">
               <Leaf className="text-opti-lime" size={20} /> AI Intelligence Engine
             </h3>
             
             <div className="flex flex-col gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <div className="text-opti-lime text-xs font-bold uppercase tracking-wider mb-2">Revenue Prediction</div>
                  <p className="text-sm text-gray-300 leading-relaxed">Based on current trajectory, consulting revenue is expected to increase by 18% this month. Recommend focusing on <span className="text-white font-medium">TechNova ERP migration</span>.</p>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <div className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-2">Anomaly Detected</div>
                  <p className="text-sm text-gray-300 leading-relaxed">Unusual number of support tickets related to AWS S3 permissions across 3 projects today.</p>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <div className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">Smart Recommendation</div>
                  <p className="text-sm text-gray-300 leading-relaxed">You spent 40% of your time on administrative tasks this week. Consider automating the GST invoice generation.</p>
                </div>
             </div>
           </div>

           {/* Pending Invoices */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-opti-dark font-outfit">Pending Invoices</h3>
              </div>
              <div className="flex flex-col gap-3">
                 {[
                   { client: "MCC Corporation", amount: "$4,500.00", due: "Due in 2 days" },
                   { client: "TechNova Solutions", amount: "$8,200.00", due: "Overdue" },
                   { client: "GovTech Initiative", amount: "$12,450.00", due: "Due in 5 days" }
                 ].map((inv, i) => (
                    <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-lg transition-all cursor-pointer">
                      <div>
                        <div className="font-bold text-opti-dark text-sm">{inv.client}</div>
                        <div className={`text-xs font-medium ${inv.due === 'Overdue' ? 'text-red-500' : 'text-slate-500'}`}>{inv.due}</div>
                      </div>
                      <div className="font-bold text-opti-dark">{inv.amount}</div>
                    </div>
                 ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm font-bold text-opti-dark border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
                Generate New Invoice
              </button>
           </div>

        </div>

      </div>

    </div>
  );
}
