'use client';

import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/store/store';
import { hydrateSession } from '@/store/slices/studentSlice';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // Hydrate and sync with sessionStorage for single-session persistence
  useEffect(() => {
    if (typeof window === 'undefined' || !storeRef.current) return;

    try {
      const saved = sessionStorage.getItem('intelligrad_session_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.student) {
          storeRef.current.dispatch(hydrateSession(parsed.student));
        }
      }
    } catch (e) {
      console.error('Failed to load session state:', e);
    }

    // Subscribe to state changes and persist in sessionStorage
    const unsubscribe = storeRef.current.subscribe(() => {
      try {
        const state = storeRef.current?.getState();
        if (state) {
          sessionStorage.setItem('intelligrad_session_v1', JSON.stringify(state));
        }
      } catch (e) {
        console.error('Failed to save session state:', e);
      }
    });

    return () => unsubscribe();
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
