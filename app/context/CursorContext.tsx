'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface CursorContextType {
  dynamicText: string;
  setDynamicText: (text: string) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [dynamicText, setDynamicText] = useState('');

  return (
    <CursorContext.Provider value={{ dynamicText, setDynamicText }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorContext() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursorContext must be used within CursorProvider');
  }
  return context;
}
