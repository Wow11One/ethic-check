'use client';

import { HTMLAttributes } from 'react';
import { MoonStar, Sun } from 'lucide-react';
import { useGlobalConfig } from '@/hooks/use-global-config.hooks';

export interface ThemeSwitchProps extends HTMLAttributes<HTMLElement> {
  gapBetweenIcon?: number;
}

export default function ThemeSwitch({
  defaultValue,
  gapBetweenIcon = 1,
  ...props
}: ThemeSwitchProps) {
  const { applicationTheme, setApplicationTheme } = useGlobalConfig();

  return (
    <div
      className='flex flex-col p-2 rounded-full bg-stone-400/10 backdrop-blur-xl cursor-pointer transition-all duration-300'
      onClick={() => setApplicationTheme(applicationTheme === 'light' ? 'dark' : 'light')}
      {...props}
    >
      {applicationTheme === 'dark' ? (
        <button
          type='button'
          className={`inline-flex gap-${gapBetweenIcon} items-center text-sm text-white`}
        >
          <MoonStar className='size-4' />
          Dark
        </button>
      ) : (
        <button
          type='button'
          className={`inline-flex gap-${gapBetweenIcon} items-center text-sm text-black`}
        >
          <Sun className='size-4' />
          Light
        </button>
      )}
    </div>
  );
}
