import usePostApi from "../methods/post";
import { Partner } from "../models/partner";

export default function PartnerEndpoint() {
  const register = usePostApi<Partner, Partner>({
    endpoint: "/partner/register",
    key: ["REGISTER"],
  });

  const login = usePostApi<
    { token: string },
    { email: string; password: string }
  >({
    endpoint: "/partner/login",
    key: ["LOGIN"],
  });

  return {
    register,
    login,
  };
}
