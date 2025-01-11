import { useMap } from "react-leaflet";
import "./App.css";
import Map from "./components/Map";
import useGeolocation from "./hooks/useGeolocation";
import SideBar from "./components/SideBar";
import useToggle from "./hooks/useToggle";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
export default function App() {
  const [toggle, handleToggle] = useToggle();

  return (
    <>
      <main className="relative w-full h-screen">
        <Map />
        <SideBar toggle={toggle} />
        <button
          onClick={() => handleToggle()}
          className={`z-[1000] fixed top-2/4 sm:top-1/2 right-0 bg-white ${
            toggle && "right-1/3"
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
