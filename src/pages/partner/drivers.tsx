import { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { Modal, useModal } from "../../components/modal";
import { useForm } from "react-hook-form";
import { Driver } from "../../apis/models/driver";
import Input from "../../components/form/Input";
import useStore from "../../utils/use-store";
import Button from "../../components/button/Button";

const Drivers = () => {
  const setHeader = useStore((state) => state.setHeader);
  const driverModal = useModal({});

  const { register } = useForm<Driver>();

  useEffect(() => {
    setHeader({
      title: "Daftar Sopir",
      component: () => {
        return (
          <button
            onClick={() => driverModal.control.open()}
            className="rounded-lg hover:opacity-60 bg-neutral p-3"
          >
            <FiPlus className="text-2xl" />
          </button>
        );
      },
    });
  }, []);

  return (
    <>
      <div className="bg-neutral h-full">halo</div>
      <Modal title="Tambah Sopir Baru" control={driverModal.control}>
        <form className="space-y-4">
          <Input label="Nama" {...register("name")} placeholder="BADE_01" />
          <Input label="Password" placeholder="BADE_01" />
          <div className="flex justify-end mt-4">
            <Button className="ml-auto">Simpan</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Drivers;
