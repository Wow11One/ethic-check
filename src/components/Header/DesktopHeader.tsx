'use client';

import ThemeSwitch from '@/components/Header/ThemeSwitch';
import { Logo } from '@/components/icons/Logo';
import { ApplicationRoutes } from '@/utils/constants';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function DesktopHeader() {
  return (
    <header className='px-5 py-4 gap-x-4 grid-cols-[1fr_auto_1fr] sticky top-0 justify-between z-[1000] items-center bg-white border-b border-b-gray-100 dark:border-b-transparent dark:text-white dark:bg-zinc-950 hidden lg:grid w-full'>
      <div className='gap-5 items-center flex'>
        <Link href={ApplicationRoutes.Home} className='flex items-center gap-4'>
          <Logo className='size-8' />
          <h1 className='text-xl font-bold'>EthicCheck</h1>
        </Link>
      </div>
      <nav className='flex gap-10'>
        <Link
          href={ApplicationRoutes.Services}
          className='relative after:absolute after:top-full after:inline-flex after:content-[""] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-black dark:after:bg-white after:transition-[width_0.3s_ease-in-out] after:rounded-xl'
        >
          Services
        </Link>
        <Link
          href={ApplicationRoutes.About}
          className='relative after:absolute after:top-full after:inline-flex after:content-[""] after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-black dark:after:bg-white after:transition-[width_0.3s_ease-in-out] after:rounded-xl'
        >
          About
        </Link>
      </nav>
      <div className='flex gap-4 items-center justify-end'>
        <ThemeSwitch className='flex flex-col px-2 py-1.5 border border-gray-100 dark:border-gray-100/10 rounded-full bg-stone-400/10 backdrop-blur-md cursor-pointer transition-all duration-300' />
        <div className='flex gap-2 items-center'>
          <SignedOut>
            <SignInButton>
              <span className='text-sm border cursor-pointer px-5 py-1.5 bg-zinc-950 text-white border-zinc-950 dark:hover:bg-gray-200 hover:bg-zinc-800 rounded-lg dark:bg-white dark:text-black transition-all duration-300'>
                Sign in
              </span>
            </SignInButton>
            <SignUpButton>
              <span className='text-sm border cursor-pointer px-5 py-1.5 rounded-lg hover:bg-zinc-900/5 dark:hover:bg-gray-50/5 transition-all duration-300'>
                Sign up
              </span>
            </SignUpButton>
          </SignedOut>
        </div>
        <SignedIn>
          <UserButton />
          <SignUpButton>
            <span className='text-sm border cursor-pointer px-5 py-1.5 rounded-lg hover:bg-zinc-900/5 dark:hover:bg-gray-50/5 transition-all duration-300'>
              Sign out
            </span>
          </SignUpButton>
        </SignedIn>
      </div>
    </header>
  );
}
