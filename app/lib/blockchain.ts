import { createHash } from 'crypto';
import { type BlockContent, blockContents } from './blockchainData';

export interface Block {
  index: number;
  timestamp: string;
  data: BlockContent;
  prevHash: string;
  hash: string;
  nonce: number;
  merkleRoot: string;
}

/**
 * Compute SHA-256 hash of a string.
 * Uses Node.js crypto module (server-side only).
 */
function sha256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

/**
 * Compute a merkle root from a list of data fields.
 * Simplified: hashes pairs of field hashes until one root remains.
 */
function computeMerkleRoot(data: Record<string, unknown>): string {
  const fields = Object.keys(data).sort();
  let hashes = fields.map((key) => sha256(`${key}:${JSON.stringify(data[key])}`));

  if (hashes.length === 0) return sha256('empty');

  while (hashes.length > 1) {
    const nextLevel: string[] = [];
    for (let i = 0; i < hashes.length; i += 2) {
      if (i + 1 < hashes.length) {
        nextLevel.push(sha256(hashes[i] + hashes[i + 1]));
      } else {
        nextLevel.push(hashes[i]);
      }
    }
    hashes = nextLevel;
  }

  return hashes[0];
}

/**
 * Find a nonce such that the hash has a specific prefix.
 * Light proof-of-work — just 1 leading zeros for aesthetics.
 */
function mineBlock(blockString: string, difficulty: number = 1): { hash: string; nonce: number } {
  const prefix = '0'.repeat(difficulty);
  let nonce = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const hash = sha256(blockString + nonce.toString());
    if (hash.startsWith(prefix)) {
      return { hash, nonce };
    }
    nonce++;
    // Safety limit — shouldn't hit this with difficulty 2
    if (nonce > 1_000_000) {
      return { hash, nonce };
    }
  }
}

/**
 * Build the full blockchain from static content.
 * Each block is cryptographically linked to the previous one.
 */
export function buildBlockchain(): Block[] {
  const chain: Block[] = [];

  for (let i = 0; i < blockContents.length; i++) {
    const data = blockContents[i];
    const prevHash = i === 0 ? '0'.repeat(64) : chain[i - 1].hash;
    const timestamp = new Date(2025, 0, 1, 0, 0, i).toISOString(); // Deterministic timestamps
    const merkleRoot = computeMerkleRoot(data as unknown as Record<string, unknown>);

    const blockString = JSON.stringify({
      index: i,
      timestamp,
      data: data.id,
      prevHash,
      merkleRoot,
    });

    const { hash, nonce } = mineBlock(blockString);

    chain.push({
      index: i,
      timestamp,
      data,
      prevHash,
      hash,
      nonce,
      merkleRoot,
    });
  }

  return chain;
}

/**
 * Verify that the blockchain is valid —
 * each block's prevHash matches the previous block's hash.
 */
export function verifyChain(chain: Block[]): boolean {
  for (let i = 1; i < chain.length; i++) {
    if (chain[i].prevHash !== chain[i - 1].hash) {
      return false;
    }
  }
  return true;
}
