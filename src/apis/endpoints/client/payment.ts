import { XndResponse } from "../../../types/xendit";
import usePostApi from "../../methods/post";

export default function PaymentEndpoint() {
  const create = usePostApi<XndResponse, {}>({
    endpoint: "/client/payment",
    key: ["CREATE_PAYMENT"],
  });

  return {
    create,
  };
}
