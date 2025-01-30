import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { convertCoordsToAddress, findRoute, searchLocations } from "../api";

const COORD_TO_ADDRESS_QUERY_KEY = "coordstoaddress";
const SEARCH_LOCATION_QUERY_KEY = "searchlocation";
const ROUTES_QUERY_KEY = "routes";

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
// export const useFindRoutes = (start, end) => {
//   return useQuery({
//     queryKey: [ROUTES_QUERY_KEY, start, end],
//     queryFn: () => searchLocations(start, end),
//   });
// };
export const useFindRoutes = (start, end) => {
  // Access the client
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: findRoute,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["route", start, end] });
    },
    onError: (error) => {
      console.error("Error registering user:", error);
    },
  });
};
