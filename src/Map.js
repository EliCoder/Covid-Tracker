import { MapContainer as LeafletMap, TileLayer,  } from 'react-leaflet';

const Map = () => {
    return (
        <div className="map">
            <LeafletMap>
                <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            </LeafletMap>
        </div>
    )
}

export default Map
