'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, Lock, Mail, ShieldAlert, ArrowRight, ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-haven-primary-dark flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 text-white relative">
      {/* Top Back Button */}
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-haven-md bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-haven shadow-haven-sm"
        >
          <ArrowLeft size={15} />
          <span>Back to Website</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="inline-flex items-center gap-2.5 bg-haven-primary px-4 py-2 rounded-haven-lg shadow-haven-md border border-white/10">
          <div className="w-8 h-8 rounded-haven-md bg-haven-accent flex items-center justify-center text-haven-primary font-bold">
            <BookOpen size={18} />
          </div>
          <span className="font-bold text-base tracking-tight text-white">
            NOVEL FEED CMS
          </span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Editorial & CMS Portal
        </h1>
        <p className="text-xs text-haven-border/70">
          Sign in with your administrative credentials to manage content and taxonomies.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-haven-surface text-haven-text border border-haven-border rounded-haven-lg p-6 sm:p-8 shadow-haven-lg space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Staff Email or Username"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@storynest.com.au"
              icon={<Mail size={16} />}
            />

            <Input
              label="Admin Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              icon={<Lock size={16} />}
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-haven-text-muted cursor-pointer">
                <input type="checkbox" defaultChecked className="w-3.5 h-3.5 accent-haven-accent" />
                <span>Keep me signed in</span>
              </label>
              <span className="text-haven-accent hover:underline cursor-pointer">Reset password</span>
            </div>

            <Button
              type="submit"
              size="md"
              disabled={loading}
              className="w-full shadow-haven-sm"
            >
              <span>{loading ? 'Authenticating...' : 'Enter Admin Console'}</span>
              <ArrowRight size={16} />
            </Button>
          </form>

          <div className="pt-4 border-t border-haven-border text-center text-xs text-haven-text-muted">
            <Link href="/" className="hover:text-haven-primary transition-haven">
              ← Return to Live Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
