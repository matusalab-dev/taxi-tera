import { Marker, Popup } from "react-leaflet";
const MapMarker = ({ idx, lat, lng, name }) => {
  return (
    <Marker key={idx} position={[lat, lng]}>
      <Popup>{name}</Popup>
    </Marker>
  );
};

export default MapMarker;
