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
import { useRef, useState, useEffect, useMemo } from "react";
import { LocateIcon } from "lucide-react";
import * as L from "leaflet";
import { useTaxiStandsQueries } from "../api/queries/taxistands-queries";
import { useCoordsToAddress } from "../api/queries/location-queries";
import MapMarker from "./Marker";
const Map = () => {
  const location = useGeolocation();
  const {
    coordinates: { lat, lng },
  } = location;
  const [center, setCenter] = useState([9.0204692, 38.8024029]); // 9.0204692, 38.8024029 default location set to Megenagna
  const mapRef = useRef();

  const ZOOM_LEVEL = 13;
  const { data = {} } = useTaxiStandsQueries();
  const { data: taxiStands = [] } = data;

  const { data: currentLocationName = {} } = useCoordsToAddress(lat, lng);
  const { features } = currentLocationName;
  // console.log("features", features);

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.flyTo([lat, lng], ZOOM_LEVEL, {
        animate: true,
      });
      setCenter([lat, lng]);
    } else {
      alert(location.error.message);
    }
  };

  useEffect(() => {
    setCenter([lat, lng]);
  }, [lat, lng]);
  // console.log("coordinates", coordinates);

  return (
    <div className="relative flex items-center justify-center w-full h-screen">
      {location.loaded && !location.error ? (
        <>
          <MapContainer
            center={[lat, lng]}
            zoom={ZOOM_LEVEL}
            ref={mapRef}
            className="absolute z-10 w-full h-full overflow-visible"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {location.loaded &&
              features?.map((feature, idx) => {
                const {
                  properties: { name },
                } = feature;
                // console.log("name props", name);

                if (idx == 0) {
                  return (
                    <MapMarker key={idx} lat={lat} lng={lng} name={name} />
                  );
                }
              })}

            {taxiStands?.map((stand, idx) => {
              const { location, name, rating } = stand;
              const [lng, lat] = location?.coordinates; // Ensure correct order of coordinates

              return <MapMarker key={idx} lat={lat} lng={lng} name={name} />;
            })}
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
            Either you denied a permission to access your location or network
            error occurred.
          </h1>
          <p className="text-base">
            refresh the page to display the location permission pop up again.
          </p>
        </div>
      ) : (
        <h1 className="animate-pulse absolute flex items-center justify-center text-4xl text-center top-1/4 left-[30vw] sm:right-1/2">
          Loading...
        </h1>
      )}
    </div>
  );
};

export default Map;
