import React, { useEffect } from "react";
import { RiCustomerService2Line } from "react-icons/ri";
import { axiosInstance } from "../../apis/axios";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useCookies } from "react-cookie";
import Avatar from "../../components/Avatar";
import PartnerEndpoint from "../../apis/endpoints/partner";
import useStore from "../../utils/use-store";
import { IoMdArrowBack } from "react-icons/io";

export interface PartnerLayoutProps {
  header?: {
    title: string;
    component?: () => React.ReactNode;
  };
}

const PartnerLayout = () => {
  const [cookie] = useCookies(["token"]);
  const { setPartner, partner } = useStore();
  const header = useStore((state) => state.header);
  const navigate = useNavigate();
  const pathName = useLocation().pathname;

  const partnerApi = PartnerEndpoint();

  useEffect(() => {
    if (cookie.token) {
      partnerApi.checkToken.mutate(
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        },
        {
          onSuccess: (data) => {
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${cookie.token}`;
            setPartner(data);
          },
          onError: () => {
            navigate("/auth/login", { replace: true });
          },
        }
      );
    } else {
      navigate("/auth/login");
    }
  }, [cookie]);

  if (partnerApi.checkToken.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-neutral w-full h-screen overflow-y-auto overflow-x-hidden">
      <div className="w-full bg-white lg:w-[600px] h-screen overflow-y-auto mx-auto">
        {pathName === "/partner" ? (
          <div className="flex justify-between p-4">
            <div className="flex items-center gap-2">
              <Avatar
                value={
                  "https://lh6.googleusercontent.com/proxy/ZLGihPRfkkerdJBqfRKKFRWQcXDCfMMuuK_6_IDH6Mfhu0VI3Du2L9eOTiz0yKsIftOesQQnj0whQCZFudjFH-cXgBKnebrpknuWtjKkDcRC5Ik"
                }
              />
              <div>
                <h5 className="font-semibold">{partner?.name}</h5>
                <p className="text-sm opacity-60">Mitra</p>
              </div>
            </div>
            <button className="rounded-full flex items-center gap-2 font-bold text-white px-6 hover:opacity-60 h-[40px] bg-gradient-to-r from-yellow-500 to-amber-500 p-2">
              <span>
                <RiCustomerService2Line className="text-xl" />
              </span>
              Bantuan
            </button>
          </div>
        ) : (
          <div className="relative z-[5] flex shadow items-center justify-between p-4">
            <button
              onClick={() => navigate(-1)}
              className="rounded-lg hover:opacity-60 p-3 bg-neutral"
            >
              <IoMdArrowBack className="text-2xl" />
            </button>
            <div>
              <h4 className="font-bold text-xl text-gray-800">
                {header?.title}
              </h4>
            </div>
            {header?.component && <div>{header.component()}</div>}
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default PartnerLayout;
