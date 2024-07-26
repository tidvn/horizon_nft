'use client';

import ConnectWalletButton from '@/components/common/wallet-connect';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/store/useSidebar';
import { FiAlignJustify } from 'react-icons/fi';

export default function Navbar() {
  const { toggle } = useSidebar();

  return (
    <nav className={`fixed right-3 top-3 z-[0] flex w-[calc(100vw_-_6%)] flex-row items-center justify-between rounded-lg bg-white/30 py-2 backdrop-blur-xl transition-all dark:bg-transparent md:right-[30px] md:top-4 md:w-[calc(100vw_-_8%)] md:p-2 lg:w-[calc(100vw_-_6%)] xl:top-[20px] xl:w-[calc(100vw_-_365px)] 2xl:w-[calc(100vw_-_380px)]`}>
      <div className="w-[154px] min-w-max ml-auto md:w-[unset]">
        <div className="relative flex min-w-max max-w-max flex-grow items-center justify-around gap-1 rounded-lg md:px-2 md:py-2 md:pl-3 xl:gap-2">
          <ConnectWalletButton />
          <Button
            variant="outline"
            className="flex h-9 min-w-9 cursor-pointer rounded-full border-zinc-200 p-0 text-xl text-zinc-950 dark:border-zinc-800 dark:text-white md:min-h-10 md:min-w-10 xl:hidden"
            onClick={toggle}
          >
            <FiAlignJustify className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
}