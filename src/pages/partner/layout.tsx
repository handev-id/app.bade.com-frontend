import { RiCustomerService2Line } from "react-icons/ri";
import React, { useEffect } from "react";
import Avatar from "../../components/Avatar";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useCookies } from "react-cookie";
import PartnerEndpoint from "../../apis/endpoints/partner";
import { axiosInstance } from "../../apis/axios";
import useStore from "../../utils/use-store";

interface Props {
  children: React.ReactNode;
  header?: {
    title: string;
    component?: () => React.ReactNode;
  };
}

const PartnerLayout = ({ children, header }: Props) => {
  const [cookie] = useCookies(["token"]);
  const { setPartner, partner } = useStore();
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
        }
      );
    }
  }, [cookie]);

  if (!partner) {
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
                <h5 className="font-semibold">{partner.name}</h5>
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
              className="rounded-lg hover:opacity-60 h-[40px] bg-neutral px-4"
            >
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
