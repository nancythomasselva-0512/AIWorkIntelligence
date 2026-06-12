"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Hexagon, Lock, Mail, Loader2, User, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('intern'); // intern, mentor, employee
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (isLogin) {
      // 1. Try real backend login
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          password
        });
        
        const { access_token, user } = response.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          role: user.role,
          name: user.full_name || user.email.split('@')[0]
        }));
        
        setSuccess('Logged in successfully!');
        
        setTimeout(() => {
          if (user.role === 'employee' || user.email.includes('admin')) {
            router.push('/admin');
          } else {
            router.push('/worksync');
          }
          setIsLoading(false);
        }, 500);
        return;
      } catch (err: any) {
        // If it is a clear validation error/unauthorized (e.g. invalid password), show error and do not fall back to mock
        if (err.response && (err.response.status === 401 || err.response.status === 400)) {
          setError(err.response.data?.message || 'Invalid credentials');
          setIsLoading(false);
          return;
        }
        console.warn('Backend offline or error, falling back to mock authentication', err);
      }

      // 2. Mock Fallback
      setTimeout(() => {
        const storedUsers = JSON.parse(localStorage.getItem('mock_users') || '{}');
        
        // Seed default administrator if credentials match and user is not registered
        let storedUser = storedUsers[email];
        if (!storedUser && email === 'admin@gmail.com' && password === 'admin@123') {
          storedUser = { role: 'employee', name: 'Employee' };
        }

        if (storedUser) {
          localStorage.setItem('token', 'mock-token-for-ui-testing');
          localStorage.setItem('user', JSON.stringify({ email, role: storedUser.role, name: storedUser.name }));
          setSuccess('Logged in successfully (Mock)!');
          setTimeout(() => {
            if (email.includes('admin') || storedUser.role === 'employee') {
              router.push('/admin');
            } else {
              router.push('/worksync');
            }
            setIsLoading(false);
          }, 500);
        } else {
          // Allow any default user login if no mock user exists
          const name = email.split('@')[0];
          const calculatedRole = email.includes('admin') ? 'employee' : 'intern';
          localStorage.setItem('token', 'mock-token-for-ui-testing');
          localStorage.setItem('user', JSON.stringify({ email, role: calculatedRole, name }));
          setSuccess('Logged in successfully (Mock)!');
          setTimeout(() => {
            if (calculatedRole === 'employee') {
              router.push('/admin');
            } else {
              router.push('/worksync');
            }
            setIsLoading(false);
          }, 500);
        }
      }, 500);

    } else {
      // Try real backend registration
      try {
        await axios.post('http://localhost:5000/api/auth/register', {
          email,
          password,
          full_name: fullName,
          role
        });
        
        setSuccess('Account created successfully! Please sign in.');
        setIsLogin(true);
        setPassword('');
        setIsLoading(false);
        return;
      } catch (err: any) {
        if (err.response && (err.response.status === 409 || err.response.status === 400)) {
          setError(err.response.data?.message || 'Email already exists or invalid registration data');
          setIsLoading(false);
          return;
        }
        console.warn('Backend offline or error, falling back to mock registration', err);
      }

      // Mock Fallback registration
      setTimeout(() => {
        const storedUsers = JSON.parse(localStorage.getItem('mock_users') || '{}');
        storedUsers[email] = { role, name: fullName };
        localStorage.setItem('mock_users', JSON.stringify(storedUsers));
        setIsLogin(true);
        setSuccess('Account created successfully (Mock)! Please sign in.');
        setPassword('');
        setIsLoading(false);
      }, 500);
    }
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
      <div className="min-h-screen bg-[#0F1F2E] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter text-white relative">
        <Link href="/" className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="mx-auto w-full sm:max-w-[390px] bg-[#071420] py-8 px-5 sm:px-8 rounded-3xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-[#0F1F2E] border border-white/10 rounded-xl flex items-center justify-center mb-4 shadow-xl">
              <Hexagon className="text-opti-lime w-7 h-7" />
            </div>
            <h2 className="text-center text-2xl font-bold text-white">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </h2>
            <p className="mt-1.5 text-center text-xs text-gray-400">
              {isLogin ? 'Or ' : 'Already have an account? '}
              <button onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }} className="font-semibold text-opti-lime hover:text-opti-lime-hover transition-colors">
                {isLogin ? 'register a new workspace' : 'sign in here'}
              </button>
            </p>
          </div>

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
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  className="bg-[#0F1F2E] border border-white/10 text-white block w-full pl-10 pr-10 sm:text-sm rounded-lg focus:ring-opti-lime focus:border-opti-lime py-3"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
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
                  <option value="intern">Intern</option>
                  <option value="mentor">Mentor</option>
                  <option value="employee">Employee</option>
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
    </>
  );
}
