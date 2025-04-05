import Link from 'next/link';
import { Logo } from '../icons/Logo';
import { ApplicationRoutes } from '@/utils/constants';

export default function Footer() {
  return (
    <footer className='bg-gray-100 dark:bg-zinc-900 dark:text-white border-t shadow md:flex md:items-center md:justify-between dark:border-zinc-950'>
      <div className='w-full max-w-screen-xl mx-auto px-10'>
        <div className='sm:flex sm:items-center sm:justify-between py-10'>
          <Link
            href={ApplicationRoutes.Home}
            className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'
          >
            <Logo className='size-5' />
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
              EthicCheck
            </span>
          </Link>
          <ul className='flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-white'>
            <li>
              <Link href={ApplicationRoutes.About} className='hover:underline me-4 md:me-6'>
                About
              </Link>
            </li>
            <li>
              <Link href={ApplicationRoutes.Services} className='hover:underline me-4 md:me-6'>
                Services
              </Link>
            </li>
          </ul>
        </div>
        <hr className='border-gray-200 sm:mx-auto dark:border-gray-700' />
        <span className='block text-sm text-gray-600 sm:text-center dark:text-white text-center p-4'>
          © 2025{' '}
          <a href='#' className='hover:underline'>
            EthicCheck™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
