'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';

// Import necessary type
type LatLngExpression = L.LatLngExpression;

interface HeatMapPoint {
    lat: number;
    lng: number;
    intensity: number;
}

function HeatMapLayer({ points }: { points: HeatMapPoint[] }) {
    const map = useMap();

    useEffect(() => {
        if (!map || points.length === 0) return;

        const heatData = points.map(point => [
            point.lat,
            point.lng,
            point.intensity
        ]);

        // Fix Leaflet icon issues
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: '/leaflet/marker-icon-2x.png',
            iconUrl: '/leaflet/marker-icon.png',
            shadowUrl: '/leaflet/marker-shadow.png',
        });

        // @ts-expect-error - leaflet.heat is not typed
        const heatLayer = L.heatLayer(heatData, {
            radius: 25,
            blur: 15,
            maxZoom: 10,
            max: Math.max(...points.map(p => p.intensity))
        }).addTo(map);

        return () => {
            map.removeLayer(heatLayer);
        };
    }, [map, points]);

    return null;
}

interface MapComponentProps {
    points: HeatMapPoint[];
    center: LatLngExpression;
}

export default function MapComponent({ points, center }: MapComponentProps) {
    return (
        <MapContainer
            center={center as [number, number]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <HeatMapLayer points={points} />
        </MapContainer>
    );
}