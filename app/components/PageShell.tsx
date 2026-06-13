'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Block } from '@/app/lib/blockchain';
import BlockCard from './BlockCard';
import Header from './Header';
import NetworkStatusBar from './NetworkStatusBar';

interface PageShellProps {
  chain: Block[];
  chainValid: boolean;
  profileName: string;
  profileTitle: string;
}

const blockLabelMap: Record<string, string> = {
  genesis: 'About Me',
  experience: 'Experience',
  skills: 'Skills',
  education: 'Education',
  certifications: 'Certs',
  projects: 'Projects',
  contact: 'Connect',
};

function getBlockLabel(chain: Block[], index: number): string {
  if (index < 0 || index >= chain.length) return '';
  return blockLabelMap[chain[index].data.type] ?? chain[index].data.subtitle ?? 'Block';
}

function getCarouselStyle(offset: number): React.CSSProperties {
  const absOffset = Math.abs(offset);
  const sign = Math.sign(offset);

  let translateX = 0;
  let translateZ = 0;
  let rotateY = 0;
  let scale = 1;
  let opacity = 0;
  let zIndex = 0;

  if (offset === 0) {
    translateX = 0;
    translateZ = 0;
    rotateY = 0;
    scale = 1;
    opacity = 1;
    zIndex = 10;
  } else if (absOffset === 1) {
    translateX = sign * 60; // %
    translateZ = -200; // px
    rotateY = sign * -25; // deg
    scale = 0.85;
    opacity = 0.4;
    zIndex = 9;
  } else if (absOffset === 2) {
    translateX = sign * 110; // %
    translateZ = -400; // px
    rotateY = sign * -35; // deg
    scale = 0.7;
    opacity = 0.15;
    zIndex = 8;
  } else {
    translateX = sign * 140;
    translateZ = -600;
    rotateY = sign * -45;
    scale = 0.5;
    opacity = 0;
    zIndex = 0;
  }

  return {
    opacity,
    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    zIndex,
    pointerEvents: offset === 0 ? 'auto' : 'none',
    transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
    position: 'absolute',
    cursor: offset !== 0 ? 'pointer' : 'default',
  };
}

export default function PageShell({ chain, chainValid, profileName, profileTitle }: PageShellProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < chain.length - 1;

  const navigateTo = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= chain.length) return;
    setActiveIndex(targetIndex);
  }, [chain.length]);

  const goNext = useCallback(() => {
    if (hasNext) navigateTo(activeIndex + 1);
  }, [hasNext, activeIndex, navigateTo]);

  const goPrev = useCallback(() => {
    if (hasPrev) navigateTo(activeIndex - 1);
  }, [hasPrev, activeIndex, navigateTo]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // Mouse wheel navigation with debounce
  useEffect(() => {
    const mainEl = document.getElementById('carousel-main');
    let timeout: NodeJS.Timeout;
    
    function throttledWheel(e: WheelEvent) {
      // Prevent default to stop scrolling the page if any
      // But we must be careful not to block scrolling inside the BlockCard body
      const target = e.target as HTMLElement;
      if (target.closest('.block-card-body')) return; // Allow internal scrolling

      e.preventDefault();
      if (timeout) return;
      timeout = setTimeout(() => {
        if (Math.abs(e.deltaY) > 20 || Math.abs(e.deltaX) > 20) {
          if (e.deltaY > 0 || e.deltaX > 0) goNext();
          else goPrev();
        }
        timeout = undefined as any;
      }, 200); // Throttling
    }
    
    if (mainEl) {
      mainEl.addEventListener('wheel', throttledWheel, { passive: false });
    }
    return () => {
      if (mainEl) mainEl.removeEventListener('wheel', throttledWheel);
      clearTimeout(timeout);
    };
  }, [goNext, goPrev]);

  return (
    <div className="flex flex-col h-screen relative overflow-hidden">
      {/* Header */}
      <Header
        blocks={chain}
        profileName={profileName}
        profileTitle={profileTitle}
        onNavigate={navigateTo}
        activeIndex={activeIndex}
      />

      {/* Main — carousel container */}
      <main 
        id="carousel-main" 
        className="flex-1 min-h-0 relative z-[1] flex flex-col items-center justify-center overflow-hidden px-4 py-4" 
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        
        {/* Render all blocks positioned via CSS */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          {chain.map((block, i) => {
            const offset = i - activeIndex;
            return (
              <div
                key={block.data.id}
                style={getCarouselStyle(offset)}
                className="will-change-transform"
                onClick={() => {
                  if (offset !== 0) navigateTo(i);
                }}
              >
                <BlockCard
                  block={block}
                  isVisible={offset === 0}
                  onNext={offset === 0 && hasNext ? goNext : undefined}
                  onPrev={offset === 0 && hasPrev ? goPrev : undefined}
                  prevLabel={offset === 0 && hasPrev ? getBlockLabel(chain, activeIndex - 1) : undefined}
                  nextLabel={offset === 0 && hasNext ? getBlockLabel(chain, activeIndex + 1) : undefined}
                  currentIndex={i}
                  totalBlocks={chain.length}
                />
              </div>
            );
          })}
        </div>

        {/* Block navigation dots */}
        <div className="block-dots mt-4 relative z-10" role="tablist" aria-label="Block navigation">
          {chain.map((block, i) => (
            <button
              key={block.data.id}
              className={`block-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => navigateTo(i)}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Navigate to ${block.data.subtitle ?? block.data.title}`}
            />
          ))}
        </div>
      </main>

      {/* Network status bar */}
      <NetworkStatusBar
        blockCount={chain.length}
        chainValid={chainValid}
        lastTimestamp={chain[chain.length - 1].timestamp}
      />
    </div>
  );
}
