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
  const ZOOM_LEVEL = 13;

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.flyTo([coordinates.lat, coordinates.lng], ZOOM_LEVEL, {
        animate: true,
      });
      setCenter((prevCenter) => [
        ...prevCenter,
        coordinates.lat,
        coordinates.lng,
      ]);
    } else {
      alert(location.error.message);
    }
  };

  useEffect(() => {
    setCenter((prevCenter) => [
      ...prevCenter,
      coordinates.lat,
      coordinates.lng,
    ]);
  }, []);
  console.log("coordinates", coordinates);
  // if (condition) {

  // } else {}
  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      {location.loaded && !location.error ? (
        <>
          <MapContainer
            center={[coordinates.lat, coordinates.lng]}
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
          </MapContainer>
          <button
            onClick={showMyLocation}
            className="absolute z-[1000] px-3 py-1  top-24 left-0"
            title="My Location"
          >
            <LocateIcon
              width="32px"
              height="32px"
              color="black"
              style={{
                padding: "2px",
                backgroundColor: "white",
                lineHeight: "30px",
                border: "2px solid #c2bfbb",
                borderRadius: "2px",
              }}
            />
          </button>
        </>
      ) : location.error ? (
        <div className="flex flex-col text-center max-w-80">
          <h1 className="flex items-center justify-center text-2xl  top-1/4 left-[30vw] sm:right-1/2">
            we need your permission to access your location!
          </h1>
          <p className="text-base">
            refresh the page to display the location permission pop up again.
          </p>
        </div>
      ) : (
        <h1 className="absolute flex items-center justify-center text-4xl text-center top-1/4 left-[30vw] sm:right-1/2">
          Loading...
        </h1>
      )}
    </div>
  );
};

export default Map;
