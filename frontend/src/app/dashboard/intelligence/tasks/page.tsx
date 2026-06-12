"use client";
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  MoreVertical, 
  Search,
  Filter,
  Plus,
  User,
  Calendar,
  ArrowRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import api from '../../../../utils/api';

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  // KPI Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    highPriority: 0
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/worklogs?limit=100');
      const allLogs = res.data.data || res.data || [];
      
      // Map logs to task structure. 
      // If priority/deadline/assignee don't exist in DB yet, mock them dynamically for UI presentation
      const mappedTasks = allLogs.map((log: any, index: number) => {
        // Pseudo-randomly assign priorities and deadlines based on ID to keep UI rich
        const priorities = ['High', 'Medium', 'Low'];
        const mockPriority = priorities[index % 3];
        
        const deadlines = ['Today', 'Tomorrow', 'Next Week', 'Overdue'];
        const mockDeadline = deadlines[index % 4];

        return {
          id: log.id,
          title: log.textContent,
          project: log.category || 'General Task',
          status: log.status || 'PENDING',
          priority: mockPriority,
          deadline: mockDeadline,
          assignee: 'Nancy Thomas',
          createdAt: new Date(log.createdAt).toLocaleDateString()
        };
      });

      setTasks(mappedTasks);

      setStats({
        total: mappedTasks.length,
        pending: mappedTasks.filter((t: any) => t.status === 'PENDING').length,
        completed: mappedTasks.filter((t: any) => t.status === 'COMPLETED').length,
        highPriority: mappedTasks.filter((t: any) => t.priority === 'High' && t.status !== 'COMPLETED').length
      });

    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'pending') return task.status === 'PENDING';
    if (activeTab === 'completed') return task.status === 'COMPLETED';
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'Low': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'COMPLETED') return <CheckCircle2 className="w-5 h-5 text-opti-lime" />;
    return <Circle className="w-5 h-5 text-gray-500 hover:text-opti-lime transition-colors cursor-pointer" />;
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="text-opti-lime" /> Task Management
          </h1>
          <p className="text-sm text-gray-400 mt-1">Track, organize, and complete your deliverables.</p>
        </div>
        <button className="bg-opti-lime text-[#071420] px-5 py-2.5 rounded-xl font-bold hover:bg-[#a6cc2b] transition-all flex items-center gap-2 text-sm shadow-[0_0_15px_rgba(199,242,58,0.2)]">
          <Plus size={18} /> Add New Task
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#0F1F2E] border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all"></div>
          <div className="text-sm text-gray-400 mb-2">Total Tasks</div>
          <div className="text-3xl font-bold text-white">{stats.total}</div>
        </div>
        <div className="bg-[#0F1F2E] border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-yellow-500/10 rounded-full blur-xl group-hover:bg-yellow-500/20 transition-all"></div>
          <div className="text-sm text-gray-400 mb-2">Pending</div>
          <div className="text-3xl font-bold text-white">{stats.pending}</div>
        </div>
        <div className="bg-[#0F1F2E] border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#C7F23A]/10 rounded-full blur-xl group-hover:bg-[#C7F23A]/20 transition-all"></div>
          <div className="text-sm text-gray-400 mb-2">Completed</div>
          <div className="text-3xl font-bold text-[#C7F23A]">{stats.completed}</div>
        </div>
        <div className="bg-[#0F1F2E] border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-red-500/10 rounded-full blur-xl group-hover:bg-red-500/20 transition-all"></div>
          <div className="text-sm text-gray-400 mb-2">High Priority</div>
          <div className="text-3xl font-bold text-red-400">{stats.highPriority}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-[#0F1F2E] border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex bg-[#071420] rounded-lg p-1 border border-white/5">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'all' ? 'bg-[#152737] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
          >
            All Tasks
          </button>
          <button 
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'pending' ? 'bg-[#152737] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
          >
            Pending
          </button>
          <button 
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'completed' ? 'bg-[#152737] text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
          >
            Completed
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="w-full bg-[#071420] border border-white/10 text-white text-sm rounded-lg pl-9 pr-4 py-2 focus:border-opti-lime focus:outline-none transition-colors placeholder:text-gray-600"
            />
          </div>
          <button className="bg-[#071420] border border-white/10 text-gray-400 p-2 rounded-lg hover:text-white hover:border-white/30 transition-all shrink-0">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-[#0F1F2E] border border-white/5 rounded-2xl overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 bg-[#071420]/50 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="col-span-5 pl-8">Task Name</div>
          <div className="col-span-2 text-center">Priority</div>
          <div className="col-span-2 text-center">Deadline</div>
          <div className="col-span-2 text-center">Assignee</div>
          <div className="col-span-1 text-right pr-2">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-white/5">
          {isLoading ? (
            <div className="p-8 text-center text-gray-400">Loading tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="p-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-gray-600 mx-auto mb-3 opacity-50" />
              <h3 className="text-white font-medium text-lg">No tasks found</h3>
              <p className="text-gray-500 text-sm mt-1">You&apos;re all caught up!</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id} className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/[0.02] transition-colors ${task.status === 'COMPLETED' ? 'opacity-60' : ''}`}>
                
                {/* Task Title & Project */}
                <div className="col-span-5 flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {getStatusIcon(task.status)}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-medium text-white truncate ${task.status === 'COMPLETED' ? 'line-through text-gray-400' : ''}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 truncate flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-opti-lime"></div>
                      {task.project}
                    </p>
                  </div>
                </div>

                {/* Priority */}
                <div className="col-span-2 flex justify-center">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>

                {/* Deadline */}
                <div className="col-span-2 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                  <Calendar size={14} className={task.deadline === 'Overdue' ? 'text-red-400' : ''} />
                  <span className={task.deadline === 'Overdue' ? 'text-red-400 font-medium' : ''}>{task.deadline}</span>
                </div>

                {/* Assignee */}
                <div className="col-span-2 flex items-center justify-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#152737] border border-white/10 flex items-center justify-center text-gray-400 text-[10px] font-bold shrink-0">
                    {task.assignee.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <span className="text-xs text-gray-300 truncate">{task.assignee}</span>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex justify-end">
                  <button className="p-1.5 text-gray-500 hover:text-white rounded-md hover:bg-white/10 transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
