import { buildBlockchain, verifyChain } from '@/app/lib/blockchain';
import { profileInfo } from '@/app/lib/blockchainData';
import PageShell from '@/app/components/PageShell';

export default function Home() {
  // Build blockchain server-side (hashes computed at build/render time)
  const chain = buildBlockchain();
  const chainValid = verifyChain(chain);

  return (
    <PageShell
      chain={chain}
      chainValid={chainValid}
      profileName={profileInfo.name}
      profileTitle={profileInfo.title}
    />
  );
}
