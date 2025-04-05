'use client';

import ThemeSwitch from '@/components/Header/ThemeSwitch';
import { Logo } from '@/components/icons/Logo';
import { ApplicationRoutes } from '@/utils/constants';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';
import { BookOpenText, BrainCircuit, LogIn, LogOut, Menu, Upload } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function MobileHeader() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    return pathname === href;
  };

  return (
    <header className='px-5 py-4 sticky top-0 justify-between z-[1000] items-center bg-white border-b border-b-gray-100 dark:border-b-transparent dark:text-white dark:bg-zinc-950 lg:hidden flex w-full'>
      <div className='gap-5 items-center flex'>
        <Link href={ApplicationRoutes.Home} className='flex items-center gap-4'>
          <Logo className='size-8' />
          <h1 className='text-xl font-bold'>EthicCheck</h1>
        </Link>
      </div>
      <button
        type='button'
        className='p-1.5 border border-zinc-700 text-zinc-700 dark:text-white dark:border-white rounded-lg'
        onClick={() => setIsMenuVisible(!isMenuVisible)}
      >
        <Menu className='size-6' />
      </button>
      <div
        className={`flex flex-col absolute top-0 left-0 right-0 h-screen ${
          isMenuVisible ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className='px-5 py-4 sticky top-0 justify-between z-[1000] items-center bg-white border-b border-b-gray-100 dark:border-b-transparent dark:text-white dark:bg-zinc-950 lg:hidden flex w-full'>
          <div className='gap-5 items-center flex'>
            <Link href={ApplicationRoutes.Home} className='flex items-center gap-4'>
              <Logo className='size-8' />
              <h1 className='text-xl font-bold'>EthicCheck</h1>
            </Link>
          </div>
          <button
            type='button'
            className='p-1.5 border border-zinc-700 text-zinc-700 dark:text-white dark:border-white rounded-lg'
            onClick={() => setIsMenuVisible(!isMenuVisible)}
          >
            <Menu className='size-6' />
          </button>
        </div>
        <div
          className={`flex flex-col bg-white text-black dark:bg-zinc-950 dark:text-white p-5 flex-1 -left-full ${
            isMenuVisible ? 'translate-x-full' : ''
          } relative transition-all duration-300`}
        >
          <nav className='flex flex-col gap-2 flex-1'>
            <Link
              href={ApplicationRoutes.Services}
              className={`relative border border-gray-100 dark:border-gray-100/10 p-3 text-sm rounded-lg inline-flex gap-3 items-center ${
                isActive(ApplicationRoutes.Services)
                  ? 'dark:bg-white dark:text-black bg-zinc-900/5 text-black border-zinc-800'
                  : ''
              }`}
              onClick={() => setIsMenuVisible(false)}
            >
              <BrainCircuit className='size-4' /> Services
            </Link>
            <Link
              href={ApplicationRoutes.About}
              className={`relative border border-gray-100 dark:border-gray-100/10 p-3 text-sm rounded-lg inline-flex gap-3 items-center ${
                isActive(ApplicationRoutes.About)
                  ? 'dark:bg-white dark:text-black bg-zinc-900/5 text-black border-zinc-800'
                  : ''
              }`}
              onClick={() => setIsMenuVisible(false)}
            >
              <BookOpenText className='size-4' /> About
            </Link>
          </nav>
          <div className='flex flex-col gap-4'>
            <ThemeSwitch
              gapBetweenIcon={3}
              className='flex flex-col p-3 border border-gray-100 dark:border-gray-100/10 rounded-full bg-stone-400/10 backdrop-blur-md cursor-pointer transition-all duration-300'
            />
            <div className='flex flex-col gap-2'>
              <SignedOut>
                <SignInButton>
                  <span className='text-sm border cursor-pointer p-3 bg-zinc-950 text-white border-zinc-950 dark:hover:bg-gray-200 hover:bg-zinc-800 rounded-lg dark:bg-white dark:text-black transition-all duration-300 inline-flex items-center gap-3'>
                    <LogIn className='size-4' />
                    Sign in
                  </span>
                </SignInButton>
                <SignUpButton>
                  <span className='text-sm border cursor-pointer p-3 rounded-lg hover:bg-zinc-900/5 dark:hover:bg-gray-50/5 transition-all duration-300 text-black dark:text-white inline-flex items-center gap-3'>
                    <Upload className='size-4' />
                    Sign up
                  </span>
                </SignUpButton>
              </SignedOut>
            </div>
            <SignedIn>
              <UserButton />
              <SignOutButton>
                <span className='text-sm border cursor-pointer px-5 py-1.5 rounded-lg hover:bg-zinc-900/5 dark:hover:bg-gray-50/5 transition-all duration-300'>
                  <LogOut className='size-5' />
                  Sign out
                </span>
              </SignOutButton>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
