import { Driver } from "../models/driver";
import useLazyGetApi from "../methods/lazy-get";
import usePostApi from "../methods/post";
import usePutApi from "../methods/put";

export default function DriverEndpoint() {
  const index = useLazyGetApi<Driver[], {}>({
    endpoint: "/driver",
    key: ["DRIVER_INDEX"],
  });

  const store = usePostApi<Driver, Driver>({
    endpoint: "/driver",
    key: ["DRIVER_STORE"],
  });

  const update = usePutApi<Driver, Driver>({
    endpoint: (data) => "/driver/" + data.uuid,
    key: ["DRIVER_UPDATE"],
  });

  const show = useLazyGetApi<Driver, { uuid: string }>({
    endpoint: (data) => "/driver/" + data.uuid,
    key: ["DRIVER_SHOW"],
  });

  const destroy = usePostApi<Driver, { uuid: string }>({
    endpoint: (data) => "/driver/" + data.uuid,
    key: ["DRIVER_DESTROY"],
  });

  return {
    index,
    store,
    update,
    show,
    destroy,
  };
}
