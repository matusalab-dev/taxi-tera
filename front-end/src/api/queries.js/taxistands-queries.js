import { useQuery } from "@tanstack/react-query";
import { getAllTaxistands } from "../api";

const TAXISTANDS_QUERY_KEY = "taxistands";

export const useTaxistandsQueries = () => {
  return useQuery({
    queryKey: [TAXISTANDS_QUERY_KEY],
    queryFn: getAllTaxistands,
  });
};
