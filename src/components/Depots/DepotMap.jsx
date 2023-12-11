import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export const DepotMap = ({ center }) => {
  const googleMapsApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={{ height: '320px', borderRadius: '8px' }}
        zoom={10}
        center={center}
      >
        <Marker position={center}></Marker>
      </GoogleMap>
    </LoadScript>
  );
};
