import { useEffect } from "react";
import { GLOBAL_ICONS } from "../../utils/icons";
import DriverEndpoint from "../../apis/endpoints/client/driver";
import Button from "../../components/button/Button";
import HomeLayout from "./layout";
import Input from "../../components/form/Input";
import PaymentEndpoint from "../../apis/endpoints/client/payment";
import { useNavigate } from "react-router-dom";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const Home = () => {
  const navigate = useNavigate();
  const driverApi = DriverEndpoint();
  const payamentapi = PaymentEndpoint();

  useEffect(() => {
    driverApi.index.mutate({});
  }, []);

  return (
    <HomeLayout>
      <div className="p-8 rounded-xl mt-8 flex flex-col gap-8 bg-white shadow-lg m-20">
        <div className="mx-auto w-full lg:w-[400px] relative">
          <Input
            placeholder="Cari Sopir"
            rightItem={GLOBAL_ICONS.search}
            className="shadow-md transition-all duration-300"
          />
        </div>

        {driverApi.index.isPending ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {driverApi.index.data?.map((driver) => (
              <button
                key={driver.id}
                onClick={() => navigate(`/driver/${driver.uuid}`)}
                className="group border border-gray-200 p-6 rounded-xl hover:border-blue-500 hover:shadow-xl transition-all duration-300 bg-white relative overflow-hidden cursor-pointer w-full text-left"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src="/driver.jpg"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                      alt={driver.name}
                    />
                    <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {driver.name}
                  </h3>
                  <p className="text-sm text-blue-600 font-medium mb-4">
                    {driver.code}
                  </p>

                  <div className="w-full space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-blue-500">📱</span>
                      <span>{driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-blue-500">🚗</span>
                      <span>{driver.car?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-blue-500">👥</span>
                      <span>{driver.partner?.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-blue-500">💰</span>
                      <span className="font-medium">
                        {formatCurrency(driver.income)}
                      </span>
                    </div>
                  </div>

                  {driver.qrcode && (
                    <div className="mt-4 p-2 bg-gray-50 rounded-lg">
                      <img
                        src={driver.qrcode}
                        alt="QR Code"
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                  )}

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      payamentapi.create.mutate({ driverId: driver.uuid });
                    }}
                    className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
                    sizing="fullSm"
                  >
                    Bayar
                  </Button>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </HomeLayout>
  );
};

export default Home;
