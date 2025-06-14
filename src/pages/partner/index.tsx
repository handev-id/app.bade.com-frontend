import { IoArrowRedoSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import Menu from "../../components/bade/Menu";
import useStore from "../../utils/use-store";
import Wrapper from "../wrapper";
import { FaCarRear } from "react-icons/fa6";

const Partner = () => {
  const { partner } = useStore();
  return (
    <Wrapper title="Home">
      <div className="px-4 pb-4 space-y-4">
        <div className="w-full rounded-2xl text-white p-4 bg-gradient-to-r shadow-lg from-blue-500 to-cyan-500">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-bold text-lg sm:text-xl md:text-2xl">
                Jumlah Saldo
              </h2>
              <div>
                <span className="text-white font-black rounded-md underline text-2xl sm:text-3xl md:text-4xl mr-1">
                  <NumericFormat
                    value={partner?.balance}
                    prefix="Rp."
                    thousandSeparator=","
                    displayType="text"
                  />
                </span>
              </div>
            </div>
            <div className="p-2 bg-white rounded-full cursor-pointer shadow-md hover:shadow">
              <IoArrowRedoSharp className="text-2xl sm:text-3xl md:text-4xl text-cyan-500" />
            </div>
          </div>
          <div className="mt-6">
            <span className="font-bold text-base sm:text-lg md:text-xl">
              Kode Mitra
            </span>
            <div>
              <span className="text-white font-black rounded-md text-xl sm:text-2xl md:text-3xl mr-1">
                {partner?.code}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral h-full p-4 rounded-t-3xl shadow-inner border-t border-gray-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white text-gray-800 rounded-xl p-4 shadow-md">
            <h3 className="font-bold text-lg sm:text-xl text-blue-500 mb-2">
              Total Transaksi Hari Ini
            </h3>
            <p className="text-base sm:text-lg font-semibold">Rp. 1.200.000</p>
          </div>
          <div className="bg-white text-gray-800 rounded-xl p-4 shadow-md">
            <h3 className="font-bold text-lg sm:text-xl mb-2 text-blue-500">
              Total Penumpang Hari Ini
            </h3>
            <p className="text-base sm:text-lg font-semibold">320 Orang</p>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Menu</h2>
          <div className="flex gap-4 flex-wrap mt-4">
            <Menu
              to="drivers"
              color="from-blue-500 to-cyan-400"
              Icon={FaUsers}
              title="Sopir"
            />
            <Menu
              to="cars"
              color="from-green-500 to-green-400"
              Icon={FaCarRear}
              title="Angkot"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Partner;
