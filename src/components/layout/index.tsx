"use client";
import { routes } from '@/constants/routes';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { getActiveRoute } from '@/utils/navigation';
import { usePathname } from 'next/navigation';
import React from 'react';
import Footer from './footer/Footer';
import Navbar from './navbar/Navbar';

interface Props {
  children: React.ReactNode;
  // title: string;
  // description: string;
  // user:  null | undefined;
  // userDetails: { [x: string]: any } | null;
}

const DashboardLayout: React.FC<Props> = (props: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="dark:bg-background-900 flex h-full w-full bg-white">
      <Toaster />
      <Sidebar
        routes={routes}
        userDetails={null}
        user={null}
        open={open}
        setOpen={() => setOpen(!open)}
      />
      <div className="h-full w-full dark:bg-zinc-950">
        <main
          className={`mx-2.5 flex-none transition-all dark:bg-zinc-950 md:pr-2 xl:ml-[328px]`}
        >
          <div className="mx-auto min-h-screen p-2 !pt-[90px] md:p-2 md:!pt-[118px]">
            {props.children}
          </div>
          <Navbar
            onOpen={() => setOpen(!open)}
            userDetails={null}
            brandText={getActiveRoute(routes, pathname)}
          />
          <div className="p-3">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;