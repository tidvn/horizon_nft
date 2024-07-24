'use client';

import {
  renderThumb,
  renderTrack,
  renderView,
} from '@/components/common/scrollbar/Scrollbar';
import { SidebarLinks } from '@/components/layout/sidebar/components/SidebarLinks';
import { Card } from '@/components/ui/card';
import { useSidebar } from '@/hooks/useSidebar';
import { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { HiX } from 'react-icons/hi';
import { HiBolt } from 'react-icons/hi2';


function Sidebar() {
  const { isMinimized, toggle } = useSidebar(); 
  return (
    <div
      className={`lg:!z-99 fixed !z-[99] min-h-full w-[300px] transition-all md:!z-[99] xl:!z-0 xl:block
         ${isMinimized ? '' : '-translate-x-[120%] xl:translate-x-[unset]'}`}
    >
      <Card
        className={`m-3 ml-3 h-[96.5vh] w-full overflow-hidden !rounded-lg border-zinc-200 pe-4 dark:border-zinc-800 sm:my-4 sm:mr-4 md:m-5 md:mr-[-50px]`}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <span
                className="absolute top-4 block cursor-pointer text-zinc-200 dark:text-white/40 xl:hidden"
                onClick={() => toggle()}
              >
                <HiX />
              </span>
              <div className={`mt-8 flex items-center justify-center`}>
                <div className="me-2 flex h-[40px] w-[40px] items-center justify-center rounded-md bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                  <HiBolt className="h-5 w-5" />
                </div>
                <h5 className="me-2 text-2xl font-bold leading-5 text-zinc-950 dark:text-white">
                  Horizon
                </h5>
              </div>
              <div className="mb-8 mt-8 h-px bg-zinc-200 dark:bg-white/10" />
              <ul>
                <SidebarLinks />
              </ul>
            </div>            
          </div>
        </Scrollbars>
      </Card>
    </div>
  );
}

export default Sidebar;