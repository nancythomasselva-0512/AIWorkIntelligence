"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Hexagon, Lock, Mail, Loader2, User, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('intern'); // intern, mentor, it_administrator
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Mock authentication for UI testing without requiring the backend server
    setTimeout(() => {
      const storedUsers = JSON.parse(localStorage.getItem('mock_users') || '{}');

      if (isLogin) {
        const storedUser = storedUsers[email] || { role: 'intern', name: fullName || email.split('@')[0] };
        localStorage.setItem('token', 'mock-token-for-ui-testing');
        localStorage.setItem('user', JSON.stringify({ email, role: storedUser.role, name: storedUser.name }));
        if (email.includes('admin') || storedUser.role === 'it_administrator') {
          router.push('/admin');
        } else {
          router.push('/worksync');
        }
      } else {
        storedUsers[email] = { role, name: fullName };
        localStorage.setItem('mock_users', JSON.stringify(storedUsers));
        setIsLogin(true);
        setSuccess('Account created successfully! Please sign in.');
        setPassword('');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px #0F1F2E inset !important;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }
      `}} />
      <div className="min-h-screen bg-[#0F1F2E] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-inter text-white relative">
        <Link href="/" className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <div className="w-16 h-16 bg-[#071420] border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
          <Hexagon className="text-opti-lime w-10 h-10" />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-white">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          {isLogin ? 'Or ' : 'Already have an account? '}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }} className="font-medium text-opti-lime hover:text-opti-lime-hover">
            {isLogin ? 'register a new workspace' : 'sign in here'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#071420] py-8 px-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] sm:rounded-3xl sm:px-10 border border-white/10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-[#C7F23A]/10 border border-[#C7F23A]/50 text-[#C7F23A] p-3 rounded-lg text-sm text-center font-semibold">
                {success}
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300">Full Name</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    required
                    className="bg-[#0F1F2E] border border-white/10 text-white block w-full pl-10 sm:text-sm rounded-lg focus:ring-opti-lime focus:border-opti-lime py-3"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300">Email address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  required
                  autoComplete="off"
                  className="bg-[#0F1F2E] border border-white/10 text-white block w-full pl-10 sm:text-sm rounded-lg focus:ring-opti-lime focus:border-opti-lime py-3"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  className="bg-[#0F1F2E] border border-white/10 text-white block w-full pl-10 sm:text-sm rounded-lg focus:ring-opti-lime focus:border-opti-lime py-3"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300">Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1 bg-[#0F1F2E] border border-white/10 text-white block w-full pl-3 pr-10 py-3 sm:text-sm rounded-lg focus:ring-opti-lime focus:border-opti-lime"
                >
                  <option value="intern">Intern / Employee</option>
                  <option value="mentor">Mentor / Manager</option>
                  <option value="it_administrator">IT Administrator</option>
                </select>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-[#071420] bg-opti-lime hover:bg-opti-lime-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opti-lime transition-all disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Sign in' : 'Create Account')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
