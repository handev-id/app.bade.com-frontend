import { RiCustomerService2Line } from "react-icons/ri";
import React from "react";
import Avatar from "../../components/Avatar";
import { useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
  header?: {
    title: string;
    component?: () => React.ReactNode;
  };
}

const PartnerLayout = ({ children, header }: Props) => {
  const pathName = useLocation().pathname;
  return (
    <div className="bg-neutral w-full h-screen overflow-y-auto overflow-x-hidden">
      <div className="w-full bg-white lg:w-[600px] h-screen overflow-y-auto mx-auto">
        {pathName === "/partner" ? (
          <div className="flex justify-between p-4">
            <Avatar />
            <button className="rounded-full flex items-center gap-2 font-bold text-white px-6 hover:opacity-60 h-[40px] bg-gradient-to-r from-yellow-500 to-amber-500 p-2">
              <span>
                <RiCustomerService2Line className="text-xl" />
              </span>
              Bantuan
            </button>
          </div>
        ) : (
          <div className="relative z-[5] flex shadow items-center justify-between p-4">
            <button className="rounded-lg hover:opacity-60 h-[40px] bg-neutral px-4">
              <FaArrowLeft />
            </button>
            <div>
              <h4 className="font-bold text-xl text-gray-800">
                {header?.title}
              </h4>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default PartnerLayout;
