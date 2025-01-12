import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import postalCodeCentroids from '../utils/postalCodeCentroids'; 

function MapVisualization({ title, data }) {
  const defaultCenter = { lat: 47.6062, lon: -122.3321  }; // Default to San Francisco

  // data to ensure it's passed correctly
  console.log('Data in MapVisualization:', data);

  return (
    <div>
      <h3 className="map-title">{title}</h3>
      <div className="map-container">
        <MapContainer
          center={defaultCenter} // Set default center
          zoom={10}
          style={{ width: '100%', height: '400px' }} 
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data?.map((item, index) => {
            const postalCode = item['Postal Code']; 
            const centroid = postalCodeCentroids[postalCode]; 

            // centroid data for debugging
            console.log(`Postal Code: ${postalCode}, Centroid:`, centroid);

            if (centroid) {
              return (
                <Marker
                  key={index}
                  position={{ lat: centroid.lat, lng: centroid.lon }} 
                  icon={new L.Icon({
                    iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png',
                    iconSize: [20, 25],
                    iconAnchor: [20, 25],
                  })}
                >
                  <Popup>
                    <div>
                      <h5>City: {item['City']}</h5>
                      <h5>Postal Code : {item['Postal Code']}</h5>
                      <h5>No of EVs: {item['Electric Vehicle Type'].length}</h5>
                    </div>
                  </Popup>
                </Marker>
              );
            }
            return null; // If no centroid found for the postal code, don't render marker
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapVisualization;
