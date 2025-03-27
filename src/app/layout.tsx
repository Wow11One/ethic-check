import { Inter } from 'next/font/google';

import { Footer } from '@/components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import Content from '@/app/content';
import { Header } from '@/components/Header';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark' style={{ colorScheme: 'dark' }}>
      <body className={`${inter.className} flex flex-col min-h-[100vh]`}>
        <Content>
          <Header />
          <main className='flex-1'>{children}</main>
          <ToastContainer />
        </Content>
        <Footer />
      </body>
    </html>
  );
}
