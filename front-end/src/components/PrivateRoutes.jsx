import { Navigate, Outlet } from "react-router";
import { useAuths } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const auth = useAuths();
  console.log("auth", auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
