'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const HEX_CHARS = '0123456789abcdef';

interface HashAnimationProps {
  targetHash: string;
  isVisible: boolean;
  /** How long the mining animation should run (ms) */
  duration?: number;
}

function generateRandomHex(length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += HEX_CHARS[Math.floor(Math.random() * 16)];
  }
  return result;
}

export default function HashAnimation({ targetHash, isVisible, duration = 1500 }: HashAnimationProps) {
  const [displayHash, setDisplayHash] = useState(targetHash);
  const [isMining, setIsMining] = useState(false);
  const hasMined = useRef(false);

  const startMining = useCallback(() => {
    if (hasMined.current) return;
    hasMined.current = true;
    setIsMining(true);

    const startTime = Date.now();
    const hashLen = targetHash.length;

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Progressively reveal the real hash from left to right
      const revealedChars = Math.floor(progress * hashLen);
      const revealed = targetHash.slice(0, revealedChars);
      const randomPart = generateRandomHex(hashLen - revealedChars);

      setDisplayHash(revealed + randomPart);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayHash(targetHash);
        setIsMining(false);
      }
    }

    // Start with random hash
    setDisplayHash(generateRandomHex(hashLen));
    requestAnimationFrame(animate);
  }, [targetHash, duration]);

  useEffect(() => {
    if (isVisible && !hasMined.current) {
      // Small delay before starting the mining animation
      const timeout = setTimeout(startMining, 300);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, startMining]);

  return (
    <span className={`hash-value ${isMining ? 'mining' : ''}`}>
      {displayHash}
    </span>
  );
}
