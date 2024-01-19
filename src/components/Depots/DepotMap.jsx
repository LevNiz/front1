import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';

export const DepotMap = ({ center }) => {
  const googleMapsApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
  const [size, setSize] = useState(window.innerWidth);

  window.addEventListener('resize', function () {
    setSize(window.innerWidth);
  });

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={{
          height: size > 576 ? '400px' : '320px',
          borderRadius: size > 576 ? '8px' : '0',
        }}
        zoom={10}
        center={center}
      >
        <Marker position={center}></Marker>
      </GoogleMap>
    </LoadScript>
  );
};
