'use client';

import { applicationThemeAtom, setApplicationThemeAtom } from '@/storage/global.storage';
import { useAtom } from 'jotai';

export const useGlobalConfig = () => {
  const [applicationTheme] = useAtom(applicationThemeAtom);
  const [_setApplicationTheme, setApplicationTheme] = useAtom(setApplicationThemeAtom);

  return {
    applicationTheme,
    setApplicationTheme,
  };
};
