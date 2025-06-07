import { Partner } from "../models/partner";
import useLazyGetApi from "../methods/lazy-get";
import usePostApi from "../methods/post";

export default function PartnerEndpoint() {
  const register = usePostApi<Partner, Partner>({
    endpoint: "/partner/register",
    key: ["REGISTER"],
  });

  const login = usePostApi<
    { token: string },
    { phone: string; password: string }
  >({
    endpoint: "/partner/login",
    key: ["LOGIN"],
  });

  const checkToken = useLazyGetApi<Partner, {}>({
    endpoint: "/partner/check-token",
    key: ["CHECK_TOKEN"],
  });

  return {
    register,
    login,
    checkToken,
  };
}
