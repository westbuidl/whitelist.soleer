import React, { ReactNode, useEffect, useState } from 'react';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletAdapter } from '@solana/wallet-adapter-base'; // Correct import for WalletAdapter type
//import { Wallet } from '@solana/wallet-adapter-wallets';

/*import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
  //SlopeWalletAdapter,
} from '@solana/wallet-adapter-wallets';*/

interface ClientWalletProviderProps {
  children: ReactNode;
  wallets: WalletAdapter[];
  endpoint: string;
}

export function ClientWalletProvider({ children, wallets, endpoint }: ClientWalletProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  /*const wallets =[
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new TorusWalletAdapter(),
    new LedgerWalletAdapter(),
   // new SlopeWalletAdapter(),
  ];*/

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
