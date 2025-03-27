'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ToastContainer } from 'react-toastify';

export default function Content({ children }: { children: any }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
