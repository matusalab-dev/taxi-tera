import { useMap } from "react-leaflet";
import "./App.css";
import Map from "./components/Map";
import useGeolocation from "./hooks/useGeolocation";
import SideBar from "./components/SideBar";
import useToggle from "./hooks/useToggle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useAuthsDispatch } from "./contexts/AuthContext";
import { useEffect } from "react";
export default function App() {
  const [toggle, handleToggle] = useToggle();

  const dispatch = useAuthsDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);

  return (
    <>
      <main className="relative w-full h-screen">
        <Map toggle={toggle} />
        <SideBar toggle={toggle} />
        <button
          onClick={() => handleToggle()}
          className={`z-[1000] fixed top-2/4 sm:top-1/2 right-0 bg-white ${
            toggle && "right-[30%]"
          }`}
        >
          {toggle ? (
            <ChevronRightIcon size={40} />
          ) : (
            <ChevronLeftIcon size={40} className="animate-pulse" />
          )}
        </button>
      </main>
    </>
  );
}
