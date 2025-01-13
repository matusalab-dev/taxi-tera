import { useQuery } from "@tanstack/react-query";
import { convertCoordsToAddress } from "../api";
import { LatLng } from "leaflet";

const COORD_TO_ADDRESS_QUERY_KEY = "coordstoaddress";

export const useCoordsToAddress = (lat, lng) => {
  return useQuery({
    queryKey: [COORD_TO_ADDRESS_QUERY_KEY, lat, lng],
    queryFn: () => convertCoordsToAddress(lat, lng),
  });
};
