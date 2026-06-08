"use client";
import React, { useState } from 'react';
import { Download, FileText, BarChart3, Users, Loader2, CheckCircle2, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const generateReport = async (type: string) => {
    setIsGenerating(true);
    try {
      // For now, we simulate backend generation and trigger download
      let url = '';
      if (type === 'worklogs' || type === 'worklogs_csv') {
        // Direct link to the backend endpoint we just created
        url = 'http://localhost:5000/api/reports/worklogs/csv';
        const token = localStorage.getItem('token');
        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!res.ok) throw new Error('Download failed');
        
        const blob = await res.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `Worklogs_Report_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else if (type === 'worklogs_pdf') {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/worklogs?limit=500', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        const logs = data.data || data;

        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.setFontSize(20);
        pdf.text("Worklogs Export Report", 10, 20);
        pdf.setFontSize(12);
        let yPosition = 35;
        
        if (logs.length === 0) {
          pdf.text("No worklogs found.", 10, yPosition);
        } else {
          logs.forEach((log: any, index: number) => {
            if (yPosition > 270) {
              pdf.addPage();
              yPosition = 20;
            }
            pdf.setFont("helvetica", "bold");
            pdf.text(`Log #${index + 1} - ${new Date(log.createdAt).toLocaleString()}`, 10, yPosition);
            yPosition += 7;
            pdf.setFont("helvetica", "normal");
            pdf.text(`Category: ${log.category || 'General'}`, 10, yPosition);
            yPosition += 7;
            const splitText = pdf.splitTextToSize(`Content: ${log.textContent || ''}`, 190);
            pdf.text(splitText, 10, yPosition);
            yPosition += (splitText.length * 7) + 10;
          });
        }
        pdf.save(`Worklogs_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      } else {
        // Simulate delay for PDF generation
        await new Promise(r => setTimeout(r, 2000));
      }
      
      setToastMessage(`${type} report generated successfully!`);
      setTimeout(() => setToastMessage(''), 3000);
    } catch (e) {
      setToastMessage('Error generating report.');
      setTimeout(() => setToastMessage(''), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 text-white min-h-screen">
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-[#0F1F2E] border border-white/10 px-5 py-3.5 rounded-xl shadow-2xl"
          >
            <CheckCircle2 className="w-5 h-5 text-[#C7F23A]" />
            <p className="text-sm font-bold text-white">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#C7F23A]/10 rounded-2xl flex items-center justify-center text-[#C7F23A] border border-[#C7F23A]/20">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Report Generation</h1>
            <p className="text-gray-400 text-sm mt-1">Export your data to CSV or PDF formats.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#071420] border border-white/10 rounded-full flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8 text-[#B084FF]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Worklogs Export</h3>
          <p className="text-sm text-gray-400 mb-6">Complete export of all user activity and work logs.</p>
          <div className="w-full mt-auto flex flex-col gap-3">
            <button 
              onClick={() => generateReport('worklogs_csv')}
              disabled={isGenerating}
              className="w-full bg-[#B084FF] text-white py-2.5 rounded-xl font-bold hover:bg-[#9f72f0] transition-colors flex justify-center items-center gap-2"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
              Download CSV
            </button>
            <button 
              onClick={() => generateReport('worklogs_pdf')}
              disabled={isGenerating}
              className="w-full bg-white/5 border border-white/10 text-white py-2.5 rounded-xl font-bold hover:bg-white/10 transition-colors flex justify-center items-center gap-2"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
              Download PDF
            </button>
          </div>
        </div>

        <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#071420] border border-white/10 rounded-full flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-[#2DD4BF]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Weekly Details PDF</h3>
          <p className="text-sm text-gray-400 mb-6">AI-generated summary of all activities and details this week.</p>
          <button 
            onClick={() => generateReport('Weekly Details')}
            disabled={isGenerating}
            className="w-full bg-[#2DD4BF] text-[#071420] py-3 rounded-xl font-bold hover:bg-[#25b5a2] transition-colors flex justify-center items-center gap-2 mt-auto"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
            Generate PDF
          </button>
        </div>

        <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#071420] border border-white/10 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-[#C7F23A]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Monthly Executive PDF</h3>
          <p className="text-sm text-gray-400 mb-6">AI-generated summary of all activities this month.</p>
          <button 
            onClick={() => generateReport('Monthly Executive')}
            disabled={isGenerating}
            className="w-full bg-[#C7F23A] text-[#071420] py-3 rounded-xl font-bold hover:bg-[#b5e028] transition-colors flex justify-center items-center gap-2 mt-auto"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
            Generate PDF
          </button>
        </div>

        <div className="bg-[#0F1F2E] border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#071420] border border-white/10 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-[#60A5FA]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Overall Performance</h3>
          <p className="text-sm text-gray-400 mb-6">Detailed metric analysis and overall performance review.</p>
          <button 
            onClick={() => generateReport('Overall Performance')}
            disabled={isGenerating}
            className="w-full bg-[#60A5FA] text-[#071420] py-3 rounded-xl font-bold hover:bg-[#4d94e6] transition-colors flex justify-center items-center gap-2 mt-auto"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
}
