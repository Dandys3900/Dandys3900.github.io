'use client';

import { useState, useEffect } from 'react';

interface NetworkStatusBarProps {
  blockCount: number;
  chainValid: boolean;
  lastTimestamp: string;
}

export default function NetworkStatusBar({ blockCount, chainValid, lastTimestamp }: NetworkStatusBarProps) {
  const [hashRate, setHashRate] = useState(0);

  // Animate the hashrate counter
  useEffect(() => {
    const interval = setInterval(() => {
      setHashRate(Math.floor(Math.random() * 500 + 1200));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="status-bar relative z-10 flex items-center justify-between px-4 md:px-6 py-2">
      <div className="flex items-center gap-4">
        {/* Network name */}
        <div className="flex items-center gap-2">
          <div className="status-dot" />
          <span className="text-[10px] font-mono text-gray-500">
            Network: <span className="text-neon-cyan">tomáš.chain</span>
          </span>
        </div>

        {/* Block count */}
        <span className="text-[10px] font-mono text-gray-600 hidden sm:block">
          Blocks: <span className="text-gray-400">{blockCount}</span>
        </span>

        {/* Chain validity */}
        <span className="text-[10px] font-mono text-gray-600 hidden sm:block">
          Chain: <span className={chainValid ? 'text-neon-green' : 'text-red-500'}>
            {chainValid ? '✓ Valid' : '✗ Invalid'}
          </span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Hash rate */}
        <span className="text-[10px] font-mono text-gray-600 hidden md:block">
          H/s: <span className="text-gray-400">{hashRate.toLocaleString()}</span>
        </span>

        {/* Last block */}
        <span className="text-[10px] font-mono text-gray-600 hidden md:block">
          Last: <span className="text-gray-400">{new Date(lastTimestamp).toLocaleDateString()}</span>
        </span>

        {/* Peers */}
        <span className="text-[10px] font-mono text-gray-600">
          Peers: <span className="text-gray-400">∞</span>
        </span>
      </div>
    </footer>
  );
}
