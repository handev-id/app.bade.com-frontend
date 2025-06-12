import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Driver } from "../../apis/models/driver";
import { Modal, useModal } from "../../components/modal";
import { XndResponse } from "../../types/xendit";
import { QRCodeCanvas } from "qrcode.react";
import HomeLayout from "./layout";
import DriverEndpoint from "../../apis/endpoints/client/driver";
import Button from "../../components/button/Button";
import PaymentEndpoint from "../../apis/endpoints/client/payment";
import Loading from "../../components/Loading";
import socket from "../../apis/socket";
import { successAlert } from "../../components/sweetalert";

const DriverDetail = () => {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [key, setKey] = useState<string | null>(null);
  const { id } = useParams();
  const qrModal = useModal<XndResponse>({});

  const driverApi = DriverEndpoint();
  const payamentapi = PaymentEndpoint();

  useEffect(() => {
    if (id) {
      driverApi.show.mutate({ uuid: id });
    }
  }, [id]);

  useEffect(() => {
    if (driverApi.show.data) {
      setDriver(driverApi.show.data);
    }
  }, [driverApi.show.data]);

  useEffect(() => {
    if (key) {
      socket.on(`payment:${key}`, () => {
        qrModal.control.close();
        successAlert({
          title: "Success",
          text: "Payment Success",
        });
      });
    }
  }, [key]);

  if (!driver) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Driver not found</p>
      </div>
    );
  }

  return (
    <HomeLayout>
      {(driverApi.show.isPending || payamentapi.create.isPending) && (
        <Loading />
      )}
      <div className="p-8 rounded-xl mt-8 flex flex-col gap-8 bg-white shadow-lg m-20">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Detail Sopir</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Section */}
          <div className="lg:w-1/3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src="/driver.jpg"
                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                    alt={driver.name}
                  />
                  <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
                </div>
                <h2 className="text-2xl font-bold mb-1">{driver.name}</h2>
                <p className="text-blue-100 font-medium">{driver.code}</p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-2/3">
            <div className="bg-neutral rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                Informasi Sopir
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <span className="text-blue-500 text-xl">📱</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nomor Telepon</p>
                      <p className="font-medium">{driver.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <span className="text-blue-500 text-xl">🚗</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Kendaraan</p>
                      <p className="font-medium">{driver.car?.name}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <span className="text-blue-500 text-xl">👥</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mitra</p>
                      <p className="font-medium">{driver.partner?.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <span className="text-blue-500 text-xl">💰</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pendapatan</p>
                      <p className="font-medium">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(driver.income)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 justify-end">
              <Button
                onClick={() => {
                  payamentapi.create.mutate(
                    { driverId: driver.uuid },
                    {
                      onSuccess: (data) => {
                        qrModal.control.open(data);
                        setKey(data.external_id);
                      },
                    }
                  );
                }}
                className="bg-blue-500 text-white"
                sizing="fullBase"
              >
                Bayar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal title="QR Code Pembayaran" control={qrModal.control}>
        <div className="flex justify-center items-center flex-col gap-3">
          <QRCodeCanvas value={qrModal.state?.qr_string} />
          <h2>
            {qrModal.state?.amount.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </h2>
        </div>
      </Modal>
    </HomeLayout>
  );
};

export default DriverDetail;
