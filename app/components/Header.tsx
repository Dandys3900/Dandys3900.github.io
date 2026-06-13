'use client';

import type { Block } from '@/app/lib/blockchain';

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
    <header className="header-bar relative z-10 flex items-center justify-between px-4 md:px-6 py-3">
      {/* Left — Profile */}
      <div className="flex items-center gap-3">
        <div className="profile-avatar" aria-hidden="true">
          TD
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold text-gray-100 text-glow-cyan">
            {profileName}
          </h1>
          <p className="text-[10px] font-mono text-gray-500 tracking-wider">
            {profileTitle}
          </p>
        </div>
      </div>

      {/* Center — Navigation tabs */}
      <nav className="hidden md:flex items-center gap-1" aria-label="Block navigation">
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

      {/* Right — Chain indicator */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-gray-600 hidden sm:block">
          block {activeIndex}/{blocks.length - 1}
        </span>
        <div className="w-2 h-2 rounded-full bg-neon-green" style={{ boxShadow: '0 0 6px rgba(57,255,20,0.6)' }} />
      </div>
    </header>
  );
}
