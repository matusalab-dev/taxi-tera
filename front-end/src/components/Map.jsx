import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css";
import useGeolocation from "../hooks/useGeolocation";
import { useRef, useState, useEffect } from "react";
import { LocateIcon } from "lucide-react";
const Map = () => {
  const location = useGeolocation();
  const [center, setCenter] = useState([9.0204692, 38.8024029]); // default location set to Megenagna
  const mapRef = useRef();

  const { coordinates } = location;
  console.log("coordinates:", location);

  const ZOOM_LEVEL = 13;

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
    } else {
      alert(location.error.message);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
        className="absolute z-10 w-full h-full overflow-visible"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {location.loaded && (
          <Marker position={[coordinates.lat, coordinates.lng]}>
            <Popup>
              Your location: <br /> lat: {coordinates.lat}, lon:{" "}
              {coordinates.lng}
            </Popup>
          </Marker>
        )}

        {/* <LocationMarker /> */}
      </MapContainer>
      <button
        onClick={showMyLocation}
        className="absolute z-[1000] px-3 py-1  top-24 left-0"
      >
        <LocateIcon
          width="30px"
          height="30px"
          color="black"
          style={{ backgroundColor: "white", lineHeight: "30px" }}
        />
      </button>
    </div>
  );
};

export default Map;
