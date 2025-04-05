'use client';

import { useGlobalConfig } from '@/hooks/use-global-config.hooks';
import { PropsWithChildren, useEffect, useState } from 'react';

export interface ThemeProviderProps extends PropsWithChildren {}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { applicationTheme } = useGlobalConfig();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    switch (applicationTheme) {
      case 'dark':
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        break;
      case 'light':
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        break;
    }
  }, [applicationTheme]);

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return;
  }

  return children;
}
