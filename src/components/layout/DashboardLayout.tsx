"use client";
import Sidebar from '@/components/layout/sidebar/Sidebar';
import Footer from '@/components/layout/footer/Footer';
import Navbar from '@/components/layout/navbar/Navbar';

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = (props: Props) => {
  return (
    <div className=" flex h-full w-full">
      <Sidebar />
      <div className="h-full w-full">
        <main
          className={`mx-2.5 flex-none transition-all md:pr-2 xl:ml-[328px]`}
        >
          <Navbar/>
          <div className="mx-auto min-h-screen p-2 !pt-[90px] md:p-2 md:!pt-[118px]">
            {props.children}
          </div>
          <div className="p-3">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;