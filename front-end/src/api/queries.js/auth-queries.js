import { useQuery } from "@tanstack/react-query";
import { register, login } from "../api";

const LOGIN_QUERY_KEY = "login";
const REGISTER_QUERY_KEY = "register";

export const useLoginQueries = () => {
  return useQuery({
    queryKey: [LOGIN_QUERY_KEY],
    queryFn: login,
  });
};
export const useRegisterQueries = () => {
  return useQuery({
    queryKey: [REGISTER_QUERY_KEY],
    queryFn: register,
  });
};
