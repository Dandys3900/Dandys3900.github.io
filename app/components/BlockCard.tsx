'use client';

import type { Block } from '@/app/lib/blockchain';
import HashAnimation from './HashAnimation';

interface BlockCardProps {
  block: Block;
  isVisible: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  prevLabel?: string;
  nextLabel?: string;
  currentIndex: number;
  totalBlocks: number;
}

function truncateHash(hash: string, length: number = 16): string {
  if (hash.length <= length) return hash;
  return `${hash.slice(0, length)}...${hash.slice(-8)}`;
}

function formatTimestamp(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

// --- Content Renderers ---

function GenesisContent({ intro }: { intro: string }) {
  const paragraphs = intro.split('\n\n');
  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-base leading-relaxed text-gray-300">
          {p}
        </p>
      ))}
    </div>
  );
}

function ExperienceContent({ experiences }: { experiences: NonNullable<Block['data']['experiences']> }) {
  return (
    <div className="flex flex-col gap-6">
      {experiences.map((exp, i) => (
        <div key={i} className="experience-item">
          <h4 className="text-base font-semibold text-neon-cyan">{exp.title}</h4>
          <p className="text-sm text-gray-400 mt-0.5">{exp.company}</p>
          <p className="text-sm text-gray-500 mt-0.5">
            {exp.period} · {exp.duration} · {exp.type}
          </p>
          <p className="text-sm leading-relaxed text-gray-400 mt-2">{exp.description}</p>
          {exp.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {exp.skills.map((skill) => (
                <span key={skill} className="skill-chip">{skill}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SkillsContent({ categories }: { categories: NonNullable<Block['data']['skillCategories']> }) {
  return (
    <div className="flex flex-col gap-5">
      {categories.map((cat) => (
        <div key={cat.category}>
          <h4 className="text-sm font-semibold text-neon-cyan uppercase tracking-widest mb-2">
            {cat.category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {cat.items.map((item) => (
              <span key={item} className="skill-chip">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EducationContent({ education }: { education: NonNullable<Block['data']['education']> }) {
  return (
    <div className="flex flex-col gap-4">
      {education.map((edu, i) => (
        <div key={i} className="education-item">
          <h4 className="text-base font-semibold text-neon-cyan">{edu.institution}</h4>
          <p className="text-sm text-gray-300 mt-1">
            {edu.degree} — {edu.field}
          </p>
          <p className="text-sm text-gray-500 mt-0.5">{edu.period}</p>
          {edu.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {edu.skills.map((skill) => (
                <span key={skill} className="skill-chip">{skill}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PlaceholderContent({ text }: { text: string }) {
  return (
    <div className="placeholder-block">
      <div className="mining-spinner" />
      <p className="text-base text-gray-500 max-w-[300px]">{text}</p>
    </div>
  );
}

function ContactContent({ intro, links }: { intro: string; links: NonNullable<Block['data']['links']> }) {
  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      <p className="text-base text-gray-300 max-w-[400px] leading-relaxed">{intro}</p>
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
            <span className="text-xs opacity-50">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// --- Main Component ---

export default function BlockCard({ block, isVisible, onPrev, onNext, prevLabel, nextLabel, currentIndex, totalBlocks }: BlockCardProps) {
  const { index, timestamp, data, prevHash, hash, nonce, merkleRoot } = block;

  function renderContent() {
    switch (data.type) {
      case 'genesis':
        return data.intro ? <GenesisContent intro={data.intro} /> : null;
      case 'experience':
        return data.experiences ? <ExperienceContent experiences={data.experiences} /> : null;
      case 'skills':
        return data.skillCategories ? <SkillsContent categories={data.skillCategories} /> : null;
      case 'education':
        return data.education ? <EducationContent education={data.education} /> : null;
      case 'certifications':
      case 'projects':
        return data.placeholder ? <PlaceholderContent text={data.placeholder} /> : null;
      case 'contact':
        return data.intro && data.links ? <ContactContent intro={data.intro} links={data.links} /> : null;
      default:
        return null;
    }
  }

  return (
    <div
      className="block-card w-[720px] max-w-[94vw] flex flex-col border-glow-cyan"
      id={`block-${data.id}`}
    >
      {/* Block Header — Terminal Style */}
      <div className="block-card-header">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-bold text-neon-cyan text-glow-cyan">
            {index === 0 ? '◆ GENESIS BLOCK' : `◆ ${data.title}`}
          </span>
          <span className="text-[10px] font-mono text-gray-600">
            {formatTimestamp(timestamp)}
          </span>
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="hash-line">
            <span className="hash-label">prev:</span>
            <span className="hash-value">{truncateHash(prevHash)}</span>
          </div>
          <div className="hash-line">
            <span className="hash-label">hash:</span>
            <HashAnimation targetHash={truncateHash(hash)} isVisible={isVisible} duration={1800} />
          </div>
          <div className="hash-line">
            <span className="hash-label">merkle:</span>
            <span className="hash-value">{truncateHash(merkleRoot)}</span>
          </div>
          <div className="hash-line">
            <span className="hash-label">nonce:</span>
            <span className="hash-value">{nonce}</span>
          </div>
        </div>
      </div>

      {/* Block Body — Content */}
      <div className="block-card-body flex-1 overflow-y-auto max-h-[65vh]">
        {data.subtitle && (
          <h3 className="text-lg font-semibold text-gray-100 mb-4 pb-2 border-b border-white/5">
            {data.subtitle}
          </h3>
        )}
        {renderContent()}
      </div>

      {/* Block Footer — Navigation */}
      <div className="block-card-footer">
        <div className="flex items-center justify-between w-full">
          {/* Previous button */}
          {onPrev ? (
            <button onClick={onPrev} className="block-nav-btn" aria-label="Previous block">
              <span className="block-nav-arrow">←</span>
              <span className="block-nav-label">{prevLabel ?? 'Prev'}</span>
            </button>
          ) : (
            <div />
          )}

          {/* Block counter */}
          <span className="text-[10px] font-mono text-gray-600">
            {currentIndex + 1} / {totalBlocks}
          </span>

          {/* Next button */}
          {onNext ? (
            <button onClick={onNext} className="block-nav-btn" aria-label="Next block">
              <span className="block-nav-label">{nextLabel ?? 'Next'}</span>
              <span className="block-nav-arrow">→</span>
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
