import mySwal from "./my-swal";
import { ReactSweetAlertOptions } from "sweetalert2-react-content";
import { CgDanger } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";

export const confirmAlert = ({ ...options }: ReactSweetAlertOptions) => {
  return mySwal.fire({
    ...options,
    icon: "warning",
    iconHtml: <CgDanger />,
  });
};

export const successAlert = ({ ...options }: ReactSweetAlertOptions) => {
  return mySwal.fire({
    ...options,
    icon: "success",
    iconHtml: <FaCheck />,
    allowEscapeKey: false,
    allowOutsideClick: false,
  });
};
