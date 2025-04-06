'use client';

import AppWalletProvider from '@/providers/APpWalletProvider';
import ThemeProvider from '@/providers/ThemeProvider';
import { ClerkProvider } from '@clerk/nextjs';
import { WalletProvider } from '@solana/wallet-adapter-react';

export default function RootProvider({ children }: { children: any }) {
  return (
    <ThemeProvider>
      <AppWalletProvider>
        <ClerkProvider>{children}</ClerkProvider>
      </AppWalletProvider>
    </ThemeProvider>
  );
}
