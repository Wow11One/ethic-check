'use client';

import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const isClient = typeof window !== 'undefined';

export const applicationThemeAtom = isClient
  ? atomWithStorage<'light' | 'dark'>(
      'theme',
      (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
    )
  : atom<'light' | 'dark'>('light');

export const setApplicationThemeAtom = atom(
  get => get(applicationThemeAtom),
  (_get, set, theme: 'light' | 'dark') => {
    localStorage.setItem('theme', theme);
    set(applicationThemeAtom, theme);
  },
);
