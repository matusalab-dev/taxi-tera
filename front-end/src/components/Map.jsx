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
import { useEffect, useState } from "react";

const Map = () => {
  const [position, setPosition] = useState([9.0204692, 38.8024029]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          //   console.log(latitude, longitude);

          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }, []);

  const LocationMarker = () => {
    const map = useMap();

    useEffect(() => {
      if (position) {
        map.setView(position, map.getZoom());
      }
    }, [position, map]);

    return (
      <Marker position={position}>
        <Popup>
          You are here <br /> Easily customizable.
        </Popup>
      </Marker>
    );
  };
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{
        height: "100vh",
        width: "100%",
        overflow: "visible",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default Map;
