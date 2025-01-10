import { useMap } from "react-leaflet";
import "./App.css";
import Map from "./components/Map";
import useGeolocation from "./hooks/useGeolocation";
export default function App() {
  return (
    <>
      <main className="">
        <Map />
        <section
          id="sidebar"
          className=" w-1/3 h-full p-5 bg-black text-white overflow-y-hidden z-[999] fixed top-0 right-0"
        >
          <h3>side bar</h3>
        </section>
      </main>
    </>
  );
}
