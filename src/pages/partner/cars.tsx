import { FiPlus } from "react-icons/fi";
import { Modal, useModal } from "../../components/modal";
import { useForm } from "react-hook-form";
import { Car } from "../../apis/models/car";
import { useEffect } from "react";
import Button from "../../components/button/Button";
import Wrapper from "../wrapper";
import Input from "../../components/form/Input";
import CarEndpoint from "../../apis/endpoints/car";
import toast from "react-hot-toast";
import DriverEndpoint from "../../apis/endpoints/driver";
import MultiSelect from "../../components/form/MultiSelectInput";

const Cars = () => {
  const carModal = useModal({});
  const driverApi = DriverEndpoint();
  const carApi = CarEndpoint();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Car & { driverIds: number[] }>();

  useEffect(() => {
    carApi.index.mutate({});
    driverApi.index.mutate({});
  }, []);

  const onSubmit = async (data: Car & { driverIds: number[] }) => {
    if (!data.driverIds) {
      toast.error("Masukkan Minimal 1 Sopir");
      return;
    }
    await toast.promise(
      (data.id ? carApi.update : carApi.store).mutateAsync({
        ...data,
        price: Number(data.price),
        driverIds: data.driverIds.map((id) => Number(id)),
      }),
      {
        loading: "Memuat...",
        success: "Berhasil menambah sopir",
        error:
          "Gagal menambah sopir " + `(CODE: ${carApi.store.error?.status})`,
      }
    );

    carModal.control.close();
    carApi.index.mutate({});
  };

  return (
    <Wrapper
      title="Daftar Angkot"
      component={() => {
        return (
          <button
            onClick={() => carModal.control.open()}
            className="rounded-lg hover:opacity-60 bg-neutral p-3"
          >
            <FiPlus className="text-2xl" />
          </button>
        );
      }}
    >
      <div className="bg-neutral h-full">halo</div>
      <Modal
        title={watch("id") ? "Edit Angkot" : "Tambah Angkot"}
        control={carModal.control}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nama"
            {...register("name", { required: "Nama Angkot harus diisi" })}
            placeholder="Masukkan Nama Sopir"
            message={errors.name?.message}
          />
          <MultiSelect
            label="Sopir (Bisa lebih dari 1)"
            onChange={(value) => {
              setValue(
                "driverIds",
                value.map((driver) => Number(driver.value))
              );
            }}
            value={(watch("driverIds") || []).map((id) => `${id}`)}
            options={(driverApi.index.data || []).map((driver) => {
              return {
                label: driver.name,
                value: `${driver.id}`,
              };
            })}
          />
          <Input
            label="Jurusan Angkot, Contoh: Stasiun Bogor - Mall BTM"
            placeholder="Stasiun Bogor - Mall BTM"
            {...register("destination", {
              required: "Tujuan Angkot harus diisi",
            })}
            message={errors.destination?.message}
          />
          <Input
            label="Harga / Ongkos Angkot Perjurusan, Contoh: 7000"
            {...register("price", { required: "Harga harus diisi" })}
            placeholder="Masukkan Harga / Ongkos Angkot Perjurusan"
            type="number"
            message={errors.price?.message}
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

export default Cars;
