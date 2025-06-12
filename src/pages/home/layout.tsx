import React from "react";

interface Props {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: Props) => {
  return (
    <div className="bg-neutral w-full h-screen overflow-y-auto overflow-x-hidden">
      {/* <div className="flex z-10 h-16 shadow justify-between px-4 lg:px-8 xl:px-12 items-center sticky top-0 left-0 bg-white">
        <div>
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className="flex gap-3">
          <Link to={"/"}>Pembayaran</Link>
        </div>
      </div> */}
      {children}
    </div>
  );
};

export default HomeLayout;
