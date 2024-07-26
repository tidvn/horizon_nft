'use client';

import NavLinks from './NavbarLinks';

export default function Navbar() {


  return (
    <nav className={`fixed right-3 top-3 z-[0] flex w-[calc(100vw_-_6%)] flex-row items-center justify-between rounded-lg bg-white/30 py-2 backdrop-blur-xl transition-all dark:bg-transparent md:right-[30px] md:top-4 md:w-[calc(100vw_-_8%)] md:p-2 lg:w-[calc(100vw_-_6%)] xl:top-[20px] xl:w-[calc(100vw_-_365px)] 2xl:w-[calc(100vw_-_380px)]`}>
      <div className="w-[154px] min-w-max ml-auto md:w-[unset]">
        <NavLinks/>
      </div>
    </nav>
  );
}