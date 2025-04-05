import { Inter } from 'next/font/google';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import RootProvider from '@/providers/RootProvider';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EthicCheck',
  description:
    'Welcome to EthicCheck - Your platform for assessing website ethic requirements based on AI',
  openGraph: {
    title: 'EthicCheck',
    description:
      'Welcome to EthicCheck - Your platform for assessing website ethic requirements based on AI',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} flex flex-col min-h-[100vh]`}>
        <RootProvider>
          <main className='flex flex-col flex-1'>
            <Header />
            {children}
            <ToastContainer />
            <Footer />
          </main>
        </RootProvider>
      </body>
    </html>
  );
}
