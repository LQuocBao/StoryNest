'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Volume2, VolumeX, Maximize2, Play, ExternalLink } from 'lucide-react';
import clsx from 'clsx';

export const FloatingStickyAd: React.FC = () => {
  const [closed, setClosed] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [muted, setMuted] = useState(true);

  if (closed) return null;

  return (
    <div
      aria-label="Floating Demo Advertisement"
      className={clsx(
        'fixed bottom-4 right-4 z-40 bg-white border border-[#d5cec3] rounded-xl shadow-2xl transition-all duration-300 overflow-hidden',
        minimized
          ? 'w-60 h-10 p-2 flex items-center justify-between cursor-pointer bg-neutral-900 text-white'
          : 'w-72 sm:w-80'
      )}
    >
      {minimized ? (
        <div
          onClick={() => setMinimized(false)}
          className="w-full flex items-center justify-between text-xs"
        >
          <span className="flex items-center gap-1.5 font-bold text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>DEMO AD (Click to Expand)</span>
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setClosed(true);
            }}
            className="p-1 hover:text-neutral-300 text-neutral-400 cursor-pointer"
            title="Close"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        <>
          {/* Header Bar */}
          <div className="bg-neutral-900 text-white px-2.5 py-1.5 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-black text-red-400 uppercase tracking-widest text-[9px]">
                DEMO AD
              </span>
              <span className="text-neutral-400 text-[9px] hidden sm:inline">
                • Sticky Video Unit
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-300">
              <button
                onClick={() => setMinimized(true)}
                className="hover:text-white p-0.5 cursor-pointer"
                title="Minimize"
              >
                <span className="text-xs font-mono">_</span>
              </button>
              <button
                onClick={() => setClosed(true)}
                className="hover:text-white p-0.5 cursor-pointer"
                title="Close ad"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Video Preview Simulation */}
          <div className="relative aspect-16/9 w-full bg-black group overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&h=300&fit=crop"
              alt="Demo Floating Video Ad"
              fill
              className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
            />
            {/* Play Overlay */}
            <div className="absolute inset-0 bg-neutral-900/30 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white border border-white/20">
                <Play size={16} className="fill-white translate-x-0.5" />
              </div>
            </div>

            {/* Video Controls Bar Simulation */}
            <div className="absolute bottom-1.5 inset-x-2 flex items-center justify-between text-white text-[9px] bg-black/60 backdrop-blur-xs px-2 py-1 rounded">
              <span className="font-mono">0:14 / 0:30 (Demo)</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMuted(!muted)}
                  className="hover:text-neutral-200 cursor-pointer"
                >
                  {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                </button>
                <span className="text-neutral-400">AdChoices</span>
              </div>
            </div>
          </div>

          {/* Ad Description & CTA */}
          <div className="p-3 bg-white space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h5 className="text-xs font-bold text-neutral-900 leading-tight">
                  Outback Wild: The Blue Mountains Expedition
                </h5>
                <p className="text-[10px] text-neutral-500 mt-0.5">
                  Stream episode 1 free on Stan AU • Demo Sponsor
                </p>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between">
              <span className="text-[9px] text-neutral-400">
                Sticky ad preview for client
              </span>
              <button
                type="button"
                className="bg-[#dc2626] hover:bg-[#b91c1c] text-white text-[11px] font-bold px-3 py-1 rounded shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Watch Demo</span>
                <ExternalLink size={10} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
