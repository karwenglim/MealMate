'use client';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Product } from '@/types/Product';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

// Define interfaces
interface OrderLocation {
  name: string;
  count: number;
  lat?: number;
  lng?: number;
}

interface TopSeller {
  name: string;
  sales: number;
}

interface HeatMapPoint {
  lat: number;
  lng: number;
  intensity: number;
}

// HeatMap component
function HeatMapLayer({ points }: { points: HeatMapPoint[] }) {
  const map = useMap();

  useEffect(() => {
    if (!map || points.length === 0) return;

    const heatData = points.map(point => [
      point.lat,
      point.lng,
      point.intensity
    ]);

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

export default function GeneralDashboard() {
  const [topFoods, setTopFoods] = useState<Product[]>([]);
  const [topDrinks, setTopDrinks] = useState<Product[]>([]);
  const [topSellers, setTopSellers] = useState<TopSeller[]>([]);
  const [orderLocations, setOrderLocations] = useState<OrderLocation[]>([]);
  const [heatMapPoints, setHeatMapPoints] = useState<HeatMapPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fix for Leaflet icons in Next.js
  useEffect(() => {
    // This is needed for Leaflet icons to display properly in Next.js
    delete (L.Icon.Default.prototype as unknown)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    });
  }, []);

  useEffect(() => {
    // In a real implementation, these would be API calls to fetch data
    const fetchDashboardData = async () => {
      try {
        // Replace these with actual API calls
        const foodsResponse = await fetch('/api/analytics/top-foods');
        const drinksResponse = await fetch('/api/analytics/top-drinks');
        const sellersResponse = await fetch('/api/analytics/top-sellers');
        const locationsResponse = await fetch('/api/analytics/order-locations');

        const foods = await foodsResponse.json();
        const drinks = await drinksResponse.json();
        const sellers = await sellersResponse.json();
        const locations = await locationsResponse.json();

        setTopFoods(foods);
        setTopDrinks(drinks);
        setTopSellers(sellers);
        setOrderLocations(locations);

        // Create heatmap points from the locations
        // In a real app, your API would return lat/lng data
        const points: HeatMapPoint[] = locations.map((location: OrderLocation) => ({
          lat: location.lat || 0,
          lng: location.lng || 0,
          intensity: location.count
        }));

        setHeatMapPoints(points);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Chart data configurations
  const foodChartData = {
    labels: topFoods.map(food => food.name),
    datasets: [
      {
        label: 'Order Quantity',
        data: topFoods.map(food => (food as unknown as {sales: number}).sales || 0),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const drinkChartData = {
    labels: topDrinks.map(drink => drink.name),
    datasets: [
      {
        label: 'Order Quantity',
        data: topDrinks.map(drink => (drink as unknown as {sales: number}).sales || 0),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const sellerChartData = {
    labels: topSellers.map(seller => seller.name),
    datasets: [
      {
        label: 'Total Sales',
        data: topSellers.map(seller => seller.sales),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // For demo purposes - mocked heatmap data if no real data available
  const mockedHeatMapPoints: HeatMapPoint[] = [
    { lat: 3.1201, lng: 101.6553, intensity: 100 }, // Example: Kuala Lumpur
    { lat: 3.1250, lng: 101.6700, intensity: 80 },
    { lat: 3.1180, lng: 101.6400, intensity: 60 },
    { lat: 3.1300, lng: 101.6800, intensity: 40 },
    { lat: 3.1150, lng: 101.6300, intensity: 30 }
  ];

  const pointsToDisplay = heatMapPoints.length > 0 ? heatMapPoints : mockedHeatMapPoints;
  const mapCenter = [3.1201, 101.6553]; // Default center (adjust as needed)

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading dashboard data...</div>;
  }

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">General Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Top Foods Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Top Foods by Order Quantity</h2>
            <div className="h-80">
              <Pie data={foodChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Top Drinks Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Top Drinks by Order Quantity</h2>
            <div className="h-80">
              <Pie data={drinkChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Top Sellers Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Top Sellers</h2>
            <div className="h-80">
              <Bar
                  data={sellerChartData}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      y: { beginAtZero: true }
                    }
                  }}
              />
            </div>
          </div>

          {/* Order Locations Heatmap */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Locations Heatmap</h2>
            <div className="h-80" style={{ width: '100%' }}>
              <MapContainer
                  center={mapCenter as [number, number]}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <HeatMapLayer points={pointsToDisplay} />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
  );
}