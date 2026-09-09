'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Lock, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('eleanor.b@storynest.com.au');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/admin/dashboard');
    }, 600);
  };

  return (
    <div className="h-screen w-full bg-haven-primary-dark flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center gap-2.5 bg-haven-primary px-3.5 py-1.5 rounded-haven-lg shadow-haven-md border border-white/10">
            <div className="w-7 h-7 rounded-haven-md bg-haven-accent flex items-center justify-center text-haven-primary font-bold">
              <BookOpen size={16} />
            </div>
            <span className="font-bold text-sm tracking-tight text-white">
              NOVEL FEED CMS
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Editorial & CMS Portal
          </h1>
          <p className="text-xs text-haven-border/70 max-w-xs mx-auto">
            Sign in with your administrative credentials to manage content and taxonomies.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-haven-surface text-haven-text border border-haven-border rounded-haven-xl p-6 sm:p-7 shadow-haven-lg space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Staff Email or Username"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@storynest.com.au"
              icon={<Mail size={15} />}
            />

            <Input
              label="Admin Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<Lock size={15} />}
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-haven-text-muted cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-3.5 h-3.5 accent-haven-accent rounded"
                />
                <span>Keep me signed in</span>
              </label>
              <span className="text-haven-accent hover:underline cursor-pointer">
                Reset password
              </span>
            </div>

            <Button
              type="submit"
              size="md"
              disabled={loading}
              className="w-full shadow-haven-sm py-2.5 text-xs font-bold"
            >
              <span>{loading ? 'Authenticating...' : 'Enter Admin Console'}</span>
              <ArrowRight size={15} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
