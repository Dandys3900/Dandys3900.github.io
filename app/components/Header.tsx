'use client';

import type { Block } from '@/app/lib/blockchain';
import Image from 'next/image';

interface HeaderProps {
  blocks: Block[];
  profileName: string;
  profileTitle: string;
  onNavigate: (index: number) => void;
  activeIndex: number;
}

const blockLabels: Record<string, string> = {
  genesis: 'About',
  experience: 'Experience',
  skills: 'Skills',
  education: 'Education',
  certifications: 'Certs',
  projects: 'Projects',
  contact: 'Connect',
};

export default function Header({ blocks, profileName, profileTitle, onNavigate, activeIndex }: HeaderProps) {
  return (
    <header className="header-bar relative z-10 flex items-center justify-between px-4 md:px-6 py-3 min-h-[64px]">
      {/* Absolute Quarter-Circle Avatar */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-br-full border-r-2 border-b-2 border-[rgba(0,255,213,0.3)] shadow-[4px_4px_20px_rgba(0,255,213,0.15)] pointer-events-none z-0">
        <Image
          src="/me.jpeg"
          alt={profileName}
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,255,213,0.15)] to-transparent"></div>
      </div>

      {/* Left — Profile Info (flex-1 keeps middle section centered) */}
      <div className="flex-1 flex items-center justify-start pl-24 md:pl-36 relative z-10">
        <div className="flex flex-col">
          <h1 className="text-base font-semibold text-gray-100 text-glow-cyan">
            {profileName}
          </h1>
          <p className="text-xs font-mono text-gray-500 tracking-wider">
            {profileTitle}
          </p>
        </div>
      </div>

      {/* Center — Navigation tabs */}
      <nav className="hidden md:flex flex-shrink-0 items-center gap-1 justify-center relative z-10" aria-label="Block navigation">
        {blocks.map((block, i) => (
          <button
            key={block.data.id}
            className={`nav-tab ${i === activeIndex ? 'active' : ''}`}
            onClick={() => onNavigate(i)}
          >
            {blockLabels[block.data.type] ?? block.data.subtitle ?? block.data.title}
          </button>
        ))}
      </nav>

      {/* Right — Chain indicator (flex-1 balances the left section) */}
      <div className="flex-1 flex items-center justify-end gap-2 relative z-10">
        <span className="text-[10px] font-mono text-gray-600 hidden sm:block">
          block {activeIndex}/{blocks.length - 1}
        </span>
        <div className="w-2 h-2 rounded-full bg-neon-green" style={{ boxShadow: '0 0 6px rgba(57,255,20,0.6)' }} />
      </div>
    </header>
  );
}
