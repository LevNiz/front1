/* eslint-disable react/prop-types */
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export const DepotMap = ({ center }) => {
  return (
    <LoadScript googleMapsApiKey='AIzaSyBxtJT8nNPyZtL8zra0lnh7yiaYefU1lyM'>
      <GoogleMap
        mapContainerStyle={{ height: '320px' }}
        zoom={10}
        center={center}
      >
        <Marker position={center}></Marker>
      </GoogleMap>
    </LoadScript>
  );
};
