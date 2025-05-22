import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Partner } from "../../apis/models/partner";
import { GLOBAL_ICONS } from "../../utils/icons";
import Select, { OptionType } from "../../components/form/SelectInput";
import Input from "../../components/form/Input";
import Button from "../../components/button/Button";
import toast from "react-hot-toast";
import PartnerEndpoint from "../../apis/endpoints/partner";

const Register = () => {
  const partnerEndpoint = PartnerEndpoint();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<Partner>();

  const onSubmit = async (data: Partner) => {
    await toast.promise(partnerEndpoint.register.mutateAsync(data), {
      loading: "Memuat...",
      success: "Berhasil mendaftar",
      error: "Gagal mendaftar, Email Sudah Terdaftar",
    });
    reset();
    navigate("/auth/login");
  };

  return (
    <div className="bg-neutral dark:bg-Dark overflow-y-auto h-screen px-4 py-16">
      <div className="w-full lg:w-[550px] m-auto p-6 rounded-lg shadow-lg bg-white dark:bg-neutralDark">
        <div className="w-full">
          <img
            className="max-w-[200px] mx-auto object-contain"
            alt="Logo Caqap"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <Controller
            control={control}
            name="type"
            render={({ field: { value, onChange } }) => (
              <Select
                value={value}
                label="Tipe"
                onChange={(val) => {
                  onChange((val as OptionType).value);
                }}
                options={[
                  { label: "Perorangan", value: "personal" },
                  { label: "Bisnis / Juragan Angkot", value: "business" },
                ]}
                message={errors.type?.message}
                isDefault
              />
            )}
          />

          <Input
            leftItem={GLOBAL_ICONS.businessOutline}
            placeholder="Masukkan Nama Bisnis Anda"
            sizing="sm"
            label="Nama"
            message={errors.name?.message}
            {...register("name", { required: "Nama bisnis wajib diisi" })}
          />

          <Input
            leftItem={GLOBAL_ICONS.userType}
            placeholder="Jumlah Angkot"
            sizing="sm"
            label="Jumlah Sopir"
            type="number"
            message={errors.driversCount?.message}
            {...register("driversCount", {
              valueAsNumber: true,
              min: { value: 0, message: "Minimal 0" },
              required: "Jumlah angkot wajib diisi",
            })}
          />

          <Input
            leftItem={GLOBAL_ICONS.email}
            placeholder="Email"
            sizing="sm"
            label="Email"
            type="email"
            message={errors.email?.message}
            {...register("email", {
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Format email tidak valid",
              },
            })}
          />

          <Input
            leftItem={GLOBAL_ICONS.phone}
            placeholder="Nomor HP"
            sizing="sm"
            label="Telepon"
            message={errors.phone?.message}
            {...register("phone")}
          />

          <Input
            leftItem={GLOBAL_ICONS.gembok}
            placeholder="Password"
            sizing="sm"
            label="Password"
            type="password"
            message={errors.password?.message}
            {...register("password", {
              required: "Password wajib diisi",
              minLength: { value: 6, message: "Minimal 6 karakter" },
            })}
          />

          <Button type="submit" style={{ marginTop: "20px" }} sizing="fullSm">
            Daftar
          </Button>

          <span className="text-sm block mt-4 text-center">
            Sudah Punya Akun?{" "}
            <Link className="text-blue-500" to={"/auth/login"}>
              Login Disini
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
