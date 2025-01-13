import { useQuery } from "@tanstack/react-query";
import { convertCoordsToAddress, searchLocations } from "../api";

const COORD_TO_ADDRESS_QUERY_KEY = "coordstoaddress";
const SEARCH_LOCATION_QUERY_KEY = "searchlocation";

export const useCoordsToAddress = (lat, lng) => {
  return useQuery({
    queryKey: [COORD_TO_ADDRESS_QUERY_KEY, lat, lng],
    queryFn: () => convertCoordsToAddress(lat, lng),
  });
};
export const useSearchLocation = (query) => {
  return useQuery({
    queryKey: [SEARCH_LOCATION_QUERY_KEY, query],
    queryFn: () => searchLocations(query),
  });
};
