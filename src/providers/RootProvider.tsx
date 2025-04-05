'use client';

import ThemeProvider from '@/providers/ThemeProvider';
import { ClerkProvider } from '@clerk/nextjs';

export default function RootProvider({ children }: { children: any }) {
  return (
    <ThemeProvider>
      <ClerkProvider>{children}</ClerkProvider>
    </ThemeProvider>
  );
}
