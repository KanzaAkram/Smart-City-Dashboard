import React from 'react';
import { MapContainer, TileLayer, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './TrafficFlowMap.css'; // Ensure this path is correct

const { BaseLayer } = LayersControl;

const TrafficFlowMap = () => {
    const apiKey = 'gnkOVINIxJFLHEKDTkF9nwVPASy65K51'; // Replace with your TomTom API Key
    const versionNumber = '4';
    const style = 'relative0'; // Changed to 'relative0' for better visualization
    const format = 'png';

    return (
        <div style={{ position: 'relative' }}>
            <MapContainer center={[24.8607, 67.0011]} zoom={12} style={{ height: '600px', width: '100%' }}>
                <LayersControl position="topright">
                    <BaseLayer checked name="Traffic Flow">
                        <TileLayer
                            url={`https://api.tomtom.com/traffic/map/${versionNumber}/tile/flow/${style}/{z}/{x}/{y}.${format}?key=${apiKey}`}
                            maxZoom={18}
                            attribution='&copy; <a href="https://www.tomtom.com">TomTom</a> Traffic'
                        />
                    </BaseLayer>

                    <BaseLayer name="Street Map">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            maxZoom={19}
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </BaseLayer>
                </LayersControl>
            </MapContainer>

            <div className="legend">
                <h4 style={{ color: 'black' }}>Traffic Legend</h4>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#00FF00' }}></div>
                    <div className="legend-label">Clear Traffic</div>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#FFFF00' }}></div>
                    <div className="legend-label">Moderate Traffic</div>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#FF0000' }}></div>
                    <div className="legend-label">Heavy Traffic</div>
                </div>
            </div>
        </div>
    );
};

export default TrafficFlowMap;

