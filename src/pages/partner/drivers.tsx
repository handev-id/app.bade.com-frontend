import { useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { Modal, useModal } from "../../components/modal";
import { useForm } from "react-hook-form";
import { Driver } from "../../apis/models/driver";
import Input from "../../components/form/Input";
import useStore from "../../utils/use-store";
import Button from "../../components/button/Button";
import DriverEndpoint from "../../apis/endpoints/driver";
import toast from "react-hot-toast";
import Wrapper from "../wrapper";

const Drivers = () => {
  const setHeader = useStore((state) => state.setHeader);
  const driverModal = useModal({});

  const driverApi = DriverEndpoint();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Driver>();

  const onSubmit = async (data: Driver) => {
    await toast.promise(
      (data.id ? driverApi.update : driverApi.store).mutateAsync(data),
      {
        loading: "Memuat...",
        success: "Berhasil menambah sopir",
        error:
          "Gagal menambah sopir " + `(CODE: ${driverApi.store.error?.status})`,
      }
    );

    driverModal.control.close();
    driverApi.index.mutate({});
  };

  useEffect(() => {
    driverApi.index.mutate({});
  }, []);

  return (
    <Wrapper
      title="Daftar Sopir"
      component={() => {
        return (
          <button
            onClick={() => driverModal.control.open()}
            className="rounded-lg hover:opacity-60 bg-neutral p-3"
          >
            <FiPlus className="text-2xl" />
          </button>
        );
      }}
    >
      <div className="bg-neutral h-full">halo</div>
      <Modal title="Tambah Sopir Baru" control={driverModal.control}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nama"
            {...register("name", { required: "Nama Sopir harus diisi" })}
            placeholder="Masukkan Nama Sopir"
            message={errors.name?.message}
          />
          <Input
            label="No Hp"
            placeholder="Masukkan No Hp Sopir"
            {...register("phone", { required: "No Hp harus diisi" })}
            type="number"
            message={errors.phone?.message}
          />
          <Input
            label="Password"
            placeholder="Masukkan Password"
            {...register("password", { required: "Password harus diisi" })}
            type="password"
            message={errors.password?.message}
          />
          <div className="flex justify-end mt-4">
            <Button type="submit" className="ml-auto">
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </Wrapper>
  );
};

export default Drivers;
