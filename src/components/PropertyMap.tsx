import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface PropertyMapProps {
  lat: number;
  lng: number;
  address: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ lat, lng, address }) => {
  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const defaultCenter = {
    lat: lat || -31.4201, // Default to Córdoba city center if no coordinates
    lng: lng || -64.1888,
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
      >
        <Marker
          position={defaultCenter}
          title={address}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default PropertyMap;