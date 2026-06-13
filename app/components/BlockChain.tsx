'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import type { Block } from '@/app/lib/blockchain';
import BlockCard from './BlockCard';
import ChainLink from './ChainLink';

interface BlockChainProps {
  chain: Block[];
}

export default function BlockChain({ chain }: BlockChainProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleBlocks, setVisibleBlocks] = useState<Set<number>>(new Set([0]));
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to a specific block
  const scrollToBlock = useCallback((index: number) => {
    const el = blockRefs.current[index];
    if (el && scrollRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, []);

  // Intersection Observer for visibility tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-block-index'));
          if (isNaN(idx)) return;

          if (entry.isIntersecting) {
            setVisibleBlocks((prev) => new Set(prev).add(idx));
            // Update active index to the most centered block
            if (entry.intersectionRatio > 0.5) {
              setActiveIndex(idx);
            }
          }
        });
      },
      {
        root: scrollRef.current,
        threshold: [0.3, 0.5, 0.8],
      }
    );

    blockRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [chain.length]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(activeIndex + 1, chain.length - 1);
        setActiveIndex(next);
        scrollToBlock(next);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = Math.max(activeIndex - 1, 0);
        setActiveIndex(prev);
        scrollToBlock(prev);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, chain.length, scrollToBlock]);

  // Map mouse wheel to horizontal scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    function handleWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container!.scrollLeft += e.deltaY;
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Horizontal scrolling blockchain */}
      <div ref={scrollRef} className="blockchain-scroll flex-1">
        {chain.map((block, i) => (
          <div key={block.data.id} className="block-snap-item flex items-center">
            {/* Chain link connector (not before genesis) */}
            {i > 0 && <ChainLink />}

            {/* Block card */}
            <div
              ref={(el) => { blockRefs.current[i] = el; }}
              data-block-index={i}
            >
              <BlockCard
                block={block}
                isVisible={visibleBlocks.has(i)}
              />
            </div>
          </div>
        ))}

        {/* Right padding for last block */}
        <div className="min-w-[20vw] flex-shrink-0" aria-hidden="true" />
      </div>

      {/* Block index dots */}
      <div className="block-dots" role="tablist" aria-label="Block navigation">
        {chain.map((block, i) => (
          <button
            key={block.data.id}
            className={`block-dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => {
              setActiveIndex(i);
              scrollToBlock(i);
            }}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Navigate to ${block.data.subtitle ?? block.data.title}`}
          />
        ))}
      </div>
    </div>
  );
}
