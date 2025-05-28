import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GLOBAL_ICONS } from "../../utils/icons";
import { useCookies } from "react-cookie";
import Input from "../../components/form/Input";
import Button from "../../components/button/Button";
import toast from "react-hot-toast";
import PartnerEndpoint from "../../apis/endpoints/partner";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const [_, setCookie] = useCookies();
  const navigate = useNavigate();
  const partnerEndpoint = PartnerEndpoint();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      await toast
        .promise(partnerEndpoint.login.mutateAsync(data), {
          loading: "Memuat...",
          success: "Login berhasil",
          error: "Email atau password salah",
        })
        .then((data) => {
          setCookie("token", data.token);
        });

      navigate("/partner");
    } catch (err) {
      console.error(err);
    }
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
          <Input
            leftItem={GLOBAL_ICONS.email}
            placeholder="Masukkan Email"
            sizing="sm"
            label="Email"
            type="email"
            message={errors.email?.message}
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Format email tidak valid",
              },
            })}
          />

          <Input
            leftItem={GLOBAL_ICONS.gembok}
            placeholder="Masukkan Password"
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
            Masuk
          </Button>

          <span className="text-sm block mt-4 text-center">
            Belum punya akun?{" "}
            <Link className="text-blue-500" to={"/auth/register"}>
              Daftar Disini
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
