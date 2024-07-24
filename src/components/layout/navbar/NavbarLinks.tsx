'use client';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/hooks/useSidebar';

import React from 'react';
import { useState, useEffect } from 'react';
import { FiAlignJustify } from 'react-icons/fi';

export default function NavLinks(props: {
  [x: string]: any;
}) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <div className="relative flex min-w-max max-w-max flex-grow items-center justify-around gap-1 rounded-lg md:px-2 md:py-2 md:pl-3 xl:gap-2">
      
      <Button>Connect Wallet</Button>    
      <Button
        variant="outline"
        className="flex h-9 min-w-9 cursor-pointer rounded-full border-zinc-200 p-0 text-xl text-zinc-950 dark:border-zinc-800 dark:text-white md:min-h-10 md:min-w-10 xl:hidden"
        onClick={handleToggle}
      >
        <FiAlignJustify className="h-4 w-4" />
      </Button>
    </div>
  );
}