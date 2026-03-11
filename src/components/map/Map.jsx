import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

export default function Map ({ parks }) {
    const centerPosition =  [39.8283, -98.5795];
    const defaultZoom = 4;

    return (
        <MapContainer
            center={centerPosition}
            zoom={defaultZoom}
            style={{ height: '500px', width: '100%'}}
        >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {parks.map((park) => {
        if (!park.latitude || !park.longitude) {
            return null;
        }
        const lat = parseFloat(park.latitude);
        const lng = parseFloat(park.longitude);
        return (
            <Marker
                key={park.id}
                position={[lat, lng]}
            >
            <Popup>
                <strong>{park.fullName}</strong>
                <br />
                Location: {park.states}
            </Popup>
            </Marker>
            
        );
      })}
      </MapContainer>
    );
}