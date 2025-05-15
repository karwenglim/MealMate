'use client';
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="h-80 flex items-center justify-center">Loading map...</div>
});

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface TopSeller {
  name: string;
  sales: number;
}

interface HeatMapPoint {
  lat: number;
  lng: number;
  intensity: number;
}

interface FoodDrinkSalesData {
  name: string;
  sales: number;
}

function getStaticDashboardData() {
  return {
    foods: [
      { name: "Chicken Rice", sales: 120 },
      { name: "Nasi Lemak", sales: 95 },
      { name: "Burger", sales: 85 },
      { name: "Pasta", sales: 70 },
      { name: "Fried Rice", sales: 65 },
    ],
    drinks: [
      { name: "Bubble Tea", sales: 150 },
      { name: "Coffee", sales: 130 },
      { name: "Fruit Juice", sales: 90 },
      { name: "Milk Tea", sales: 85 },
      { name: "Soft Drink", sales: 80 },
    ],
    sellers: [
      { name: "Food Corner", sales: 2500 },
      { name: "Tasty Bites", sales: 2200 },
      { name: "Quick Meal", sales: 1800 },
      { name: "Campus Cafe", sales: 1600 },
      { name: "Snack Shop", sales: 1400 },
    ],
    heatMapPoints: [
      { lat: 3.1201, lng: 101.6553, intensity: 100 },
      { lat: 3.1250, lng: 101.6700, intensity: 80 },
      { lat: 3.1180, lng: 101.6400, intensity: 60 },
      { lat: 3.1300, lng: 101.6800, intensity: 40 },
      { lat: 3.1150, lng: 101.6300, intensity: 30 }
    ]
  };
}

export default function GeneralDashboard() {
  const [topFoods, setTopFoods] = useState<FoodDrinkSalesData[]>([]);
  const [topDrinks, setTopDrinks] = useState<FoodDrinkSalesData[]>([]);
  const [topSellers, setTopSellers] = useState<TopSeller[]>([]);
  const [heatMapPoints, setHeatMapPoints] = useState<HeatMapPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real implementation, these would be API calls to fetch data
    const fetchDashboardData = async () => {
      try {
        // Use static data instead of API calls
        const staticData = getStaticDashboardData();

        setTopFoods(staticData.foods);
        setTopDrinks(staticData.drinks);
        setTopSellers(staticData.sellers);

        // Use the locations data directly for heatmap points
        setHeatMapPoints(staticData.heatMapPoints);
        setIsLoading(false);
      } catch (error) {
        console.error('Error setting dashboard data:', error);
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

  const pointsToDisplay = heatMapPoints.length > 0 ? heatMapPoints : getStaticDashboardData().heatMapPoints;
  const mapCenter: [number, number] = [3.1201, 101.6553]; // Default center (adjust as needed)

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
              <MapWithNoSSR points={pointsToDisplay} center={mapCenter} />
            </div>
          </div>
        </div>
      </div>
  );
}