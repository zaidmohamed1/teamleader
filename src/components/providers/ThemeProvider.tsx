'use client';

import React, { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = useAppSelector((state) => state.student.isDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return <>{children}</>;
}
