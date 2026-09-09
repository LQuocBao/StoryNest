'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Info, X, Star, ShoppingBag } from 'lucide-react';
import clsx from 'clsx';

export type DemoAdFormat = 'shopping-feed' | 'in-article-banner' | 'native-recommendations';

interface DemoAdSlotProps {
  format?: DemoAdFormat;
  slotId?: string;
  className?: string;
}

const DEMO_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Kindle Paperwhite (16 GB) – 6.8" glare-free display with warm light',
    price: '$199.00',
    oldPrice: '$239.00',
    rating: '4.9',
    reviews: '12.4k',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop',
    merchant: 'Amazon AU',
  },
  {
    id: 'prod-2',
    title: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
    price: '$388.00',
    oldPrice: '$499.00',
    rating: '4.8',
    reviews: '8.1k',
    badge: 'Save 22%',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    merchant: 'TechStore AU',
  },
  {
    id: 'prod-3',
    title: 'Ergonomic Memory Foam Reading Neck Pillow for Long Fiction',
    price: '$34.50',
    oldPrice: '$45.00',
    rating: '4.7',
    reviews: '3.2k',
    badge: 'Editor Pick',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=300&h=300&fit=crop',
    merchant: 'ComfortLiving',
  },
  {
    id: 'prod-4',
    title: 'Dimmable Amber Eye-Care Clip-on Book Light (USB-C Rechargeable)',
    price: '$21.99',
    oldPrice: '$29.99',
    rating: '4.9',
    reviews: '5.6k',
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop',
    merchant: 'Bookworm AU',
  },
];

const DEMO_NATIVE_STORIES = [
  {
    id: 'nat-1',
    title: 'The 7 Untouched Mountain Hideaways in NSW You Can Visit This Spring',
    sponsor: 'Destination NSW • Sponsored Demo',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop',
  },
  {
    id: 'nat-2',
    title: 'Why Australian Landholders Are Installing Off-Grid Solar Batteries in 2026',
    sponsor: 'Clean Energy Council • Sponsored Demo',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=500&h=300&fit=crop',
  },
  {
    id: 'nat-3',
    title: 'The True Story of the Australian Gold Miner Who Stashed a Fortune in 1894',
    sponsor: 'Heritage Australia • Sponsored Demo',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&h=300&fit=crop',
  },
];

export const DemoAdSlot: React.FC<DemoAdSlotProps> = ({
  format = 'shopping-feed',
  slotId,
  className,
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="my-4 py-2 px-3 bg-neutral-100 rounded-lg border border-dashed border-neutral-300 text-center text-[11px] text-neutral-500 flex items-center justify-center gap-2">
        <span>[Demo Ad Slot {slotId ? `"${slotId}"` : ''} dismissed by user preview]</span>
        <button
          onClick={() => setDismissed(false)}
          className="text-blue-600 font-semibold underline hover:text-blue-800 cursor-pointer text-[11px]"
        >
          Restore Demo
        </button>
      </div>
    );
  }

  // ==========================================
  // FORMAT 1: SHOPPING CAROUSEL (Matches user screenshot)
  // Red tag "AD DEMO" on left + product cards
  // ==========================================
  if (format === 'shopping-feed') {
    return (
      <div
        className={clsx(
          'my-6 bg-white border border-[#e5dfd5] rounded-xl overflow-hidden shadow-2xs transition-all',
          className
        )}
      >
        {/* Top Mini Disclaimers */}
        <div className="bg-[#fcfbf9] px-3 py-1 border-b border-[#f0ece5] flex items-center justify-between text-[10px] text-neutral-400">
          <span className="flex items-center gap-1 font-medium tracking-wide">
            <ShoppingBag size={11} className="text-red-600" />
            <span className="text-red-700 font-bold uppercase tracking-wider">DEMO ADVERTISEMENT</span>
            <span>• Google Shopping / Affiliate Placement</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">AdSense / Partner Demo</span>
            <button
              onClick={() => setDismissed(true)}
              className="text-neutral-400 hover:text-neutral-700 p-0.5 rounded cursor-pointer"
              title="Dismiss preview"
            >
              <X size={12} />
            </button>
          </div>
        </div>

        {/* Banner Body */}
        <div className="flex flex-col sm:flex-row items-stretch">
          {/* Left Red AD Tag matching the user screenshot */}
          <div className="bg-[#dc2626] sm:w-12 py-1.5 sm:py-3 px-3 sm:px-0 flex sm:flex-col items-center justify-between sm:justify-center shrink-0 select-none text-white">
            <span className="text-[10px] sm:text-[11px] font-black tracking-widest uppercase sm:[writing-mode:vertical-rl] sm:rotate-180 text-white">
              DEMO AD
            </span>
            <span className="text-[9px] bg-red-800/80 px-1 py-0.2 rounded font-mono text-red-100 sm:mt-2">
              AD
            </span>
          </div>

          {/* Product Cards Row */}
          <div className="flex-1 p-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 bg-white overflow-hidden">
            {DEMO_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="group flex flex-col justify-between p-2 rounded-lg border border-[#f0ece5] hover:border-blue-400 hover:shadow-xs transition-all bg-[#faf9f7] hover:bg-white"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-md overflow-hidden bg-neutral-200 mb-1.5">
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 160px"
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <span className="absolute top-1 left-1 bg-neutral-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      {prod.badge}
                    </span>
                  </div>

                  <h5 className="text-[11px] font-semibold text-neutral-800 line-clamp-2 leading-snug group-hover:text-blue-700">
                    {prod.title}
                  </h5>
                </div>

                <div className="mt-2 pt-1 border-t border-neutral-200/60">
                  <div className="flex items-center gap-1 text-[10px] text-amber-600 mb-0.5">
                    <Star size={10} className="fill-amber-500 text-amber-500" />
                    <span className="font-bold">{prod.rating}</span>
                    <span className="text-neutral-400">({prod.reviews})</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-black text-[#dc2626]">
                      {prod.price}
                    </span>
                    <span className="text-[10px] text-neutral-400 line-through">
                      {prod.oldPrice}
                    </span>
                  </div>
                  <span className="text-[9px] text-neutral-400 truncate block mt-0.5">
                    {prod.merchant}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-[#fcfbf9] px-3 py-1 border-t border-[#f0ece5] flex items-center justify-between text-[9px] text-neutral-400">
          <span>Sponsored link simulation • Customer will see real Google Shopping feed here</span>
          <span className="font-semibold text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
            <span>Visit Demo Store</span>
            <ExternalLink size={9} />
          </span>
        </div>
      </div>
    );
  }

  // ==========================================
  // FORMAT 2: IN-ARTICLE DISPLAY BANNER
  // Responsive banner with AdChoices & creative
  // ==========================================
  if (format === 'in-article-banner') {
    return (
      <aside
        aria-label="Demo Advertisement"
        className={clsx(
          'my-6 bg-gradient-to-r from-[#fcfbf9] via-white to-[#fcfbf9] border border-[#e4ded5] rounded-xl p-4 sm:p-5 shadow-2xs relative overflow-hidden',
          className
        )}
      >
        {/* Top Ad Label */}
        <div className="flex items-center justify-between mb-3 text-[10px] text-neutral-400 border-b border-[#f0ece5] pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="bg-[#dc2626] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded tracking-wider">
              DEMO AD
            </span>
            <span className="font-bold text-neutral-600 uppercase tracking-wide">
              ADVERTISEMENT
            </span>
            <span className="text-neutral-400 hidden sm:inline">• In-Article Display Slot</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-0.5 hover:text-neutral-600 cursor-pointer">
              <Info size={11} />
              <span>AdChoices</span>
            </span>
            <button
              onClick={() => setDismissed(true)}
              className="text-neutral-400 hover:text-neutral-700 p-0.5 rounded cursor-pointer"
              title="Dismiss ad preview"
            >
              <X size={12} />
            </button>
          </div>
        </div>

        {/* Banner Content */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-neutral-200 border border-neutral-200">
              <Image
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop"
                alt="Demo Sponsor"
                fill
                className="object-cover"
              />
              <span className="absolute bottom-0 inset-x-0 bg-neutral-900/80 text-white text-[8px] font-bold text-center py-0.5 uppercase tracking-wider">
                Demo
              </span>
            </div>

            <div className="space-y-1">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                Audible Australia Partner
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-[#18181b] leading-snug">
                Listen to Australian Fiction Bestsellers — 30-Day Free Trial
              </h4>
              <p className="text-[11px] text-neutral-500 leading-relaxed max-w-md">
                Get 2 free audiobooks and unlimited access to thousands of audio dramas. Cancel anytime.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto shrink-0 flex sm:flex-col items-center justify-end gap-2">
            <button
              type="button"
              className="w-full sm:w-auto bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-2xs hover:shadow-md transition-all uppercase tracking-wide cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Learn More (Demo)</span>
              <ExternalLink size={12} />
            </button>
            <span className="text-[9px] text-neutral-400 whitespace-nowrap">
              Terms apply • 18+ AU
            </span>
          </div>
        </div>
      </aside>
    );
  }

  // ==========================================
  // FORMAT 3: NATIVE SPONSORED STORIES GRID
  // Taboola / Outbrain style bottom content
  // ==========================================
  return (
    <div
      className={clsx(
        'my-8 bg-white border border-[#e2ddd5] rounded-xl p-4 sm:p-5 shadow-2xs',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4 border-b border-[#eee8df] pb-2">
        <div className="flex items-center gap-2">
          <span className="bg-[#dc2626] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded tracking-wider">
            DEMO AD
          </span>
          <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-700">
            SPONSORED STORIES FROM AROUND THE WEB (DEMO)
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
          <span>Ad Content</span>
          <button
            onClick={() => setDismissed(true)}
            className="hover:text-neutral-700 p-0.5 cursor-pointer"
            title="Dismiss preview"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {DEMO_NATIVE_STORIES.map((item) => (
          <div
            key={item.id}
            className="group block rounded-lg overflow-hidden border border-[#eee8df] hover:border-neutral-400 transition-all bg-[#faf8f5] hover:bg-white"
          >
            <div className="relative aspect-16/9 w-full bg-neutral-200 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-1.5 left-1.5 bg-neutral-900/80 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                Sponsored
              </span>
            </div>
            <div className="p-3">
              <h5 className="font-bold text-xs text-neutral-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                {item.title}
              </h5>
              <p className="text-[10px] text-neutral-400 mt-1 font-medium truncate">
                {item.sponsor}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
