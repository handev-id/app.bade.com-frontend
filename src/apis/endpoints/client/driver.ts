import { Driver } from "../../models/driver";
import useLazyGetApi from "../../methods/lazy-get";

export default function DriverEndpoint() {
  const index = useLazyGetApi<Driver[], {}>({
    endpoint: "/client/driver",
    key: ["DRIVER_INDEX"],
  });

  const show = useLazyGetApi<Driver, { uuid: string }>({
    endpoint: (data) => "/client/driver/" + data.uuid,
    key: ["DRIVER_SHOW"],
  });

  return {
    index,
    show,
  };
}
