import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Partner } from "../../apis/models/partner";
import { GLOBAL_ICONS } from "../../utils/icons";
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
    reset,
  } = useForm<Partner>();

  const onSubmit = async (data: Partner) => {
    await toast.promise(
      partnerEndpoint.register.mutateAsync({ ...data, type: "business" }),
      {
        loading: "Memuat...",
        success: "Berhasil mendaftar",
        error: "Gagal mendaftar, No Hp Sudah Terdaftar " + `(CODE: ${partnerEndpoint.register.error?.status})`,
      }
    );
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
          <div>
            <Input
              leftItem={GLOBAL_ICONS.businessOutline}
              placeholder="Masukkan Nama Anda"
              sizing="sm"
              label="Nama"
              {...register("name", { required: "Nama wajib diisi" })}
              message={errors.name?.message}
            />
          </div>

          <div>
            <Input
              leftItem={GLOBAL_ICONS.userType}
              placeholder="Jumlah Angkot Yang Aktif Narik"
              sizing="sm"
              label="Jumlah Angkot"
              type="number"
              {...register("driversCount", {
                valueAsNumber: true,
                min: { value: 0, message: "Minimal 0" },
                required: "Jumlah angkot wajib diisi",
              })}
              message={errors.driversCount?.message}
            />
          </div>

          <div>
            <Input
              leftItem={GLOBAL_ICONS.email}
              placeholder="Email (Boleh Dikosongkan)"
              sizing="sm"
              label="Email (Boleh Dikosongkan)"
              type="email"
              {...register("email", {
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Format email tidak valid",
                },
                required: false,
              })}
              message={errors.email?.message}
            />
          </div>

          <div>
            <Input
              leftItem={GLOBAL_ICONS.phone}
              placeholder="Nomor HP (Wajib Diisi)"
              sizing="sm"
              label="Nomor HP (Wajib Diisi)"
              {...register("phone", { required: "Wajib Diisi" })}
              message={errors.phone?.message}
            />
          </div>

          <div>
            <Input
              leftItem={GLOBAL_ICONS.gembok}
              placeholder="Password"
              sizing="sm"
              label="Password"
              type="password"
              {...register("password", {
                required: "Password wajib diisi",
                minLength: { value: 6, message: "Minimal 6 karakter" },
              })}
              message={errors.password?.message}
            />
          </div>

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
