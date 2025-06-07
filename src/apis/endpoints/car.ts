import { Car } from "../models/car";
import useLazyGetApi from "../methods/lazy-get";
import usePostApi from "../methods/post";
import usePutApi from "../methods/put";

export default function CarEndpoint() {
  const index = useLazyGetApi<Car[], {}>({
    endpoint: "/car",
    key: ["DRIVER_INDEX"],
  });

  const store = usePostApi<Car, Car & { driverIds: number[] }>({
    endpoint: "/car",
    key: ["DRIVER_STORE"],
  });

  const update = usePutApi<Car, Car & { driverIds: number[] }>({
    endpoint: (data) => "/car/" + data.id,
    key: ["DRIVER_UPDATE"],
  });

  const show = useLazyGetApi<Car, { id: number }>({
    endpoint: (data) => "/car/" + data.id,
    key: ["DRIVER_SHOW"],
  });

  const destroy = usePostApi<Car, { id: number }>({
    endpoint: (data) => "/car/" + data.id,
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
