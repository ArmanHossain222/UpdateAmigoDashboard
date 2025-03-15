import React from 'react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Overview = () => {
  // Data for Line Chart (Sales Analytics)
  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: [25000, 50000, 75000, 100000, 90000, 110000, 140000, 120000, 85000, 95000, 125000, 150000],
        borderColor: '#00d1ff',
        backgroundColor: 'rgba(0, 209, 255, 0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Data for Bar Chart (Returns)
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Returns',
        data: [10, 20, 30, 43, 35, 25],
        backgroundColor: '#1de9b6',
      },
    ],
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      {/* Header Section */}
      <div className="relative">
        <div className="flex justify-between items-center  bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-lg  pt-[40px] pb-[140px] mb-16">
          <h1 className="text-4xl font-bold px-8">Dashboard Overview</h1>
          <input
            type="text"
            placeholder="Search for anything"
            className="bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mr-8 w-[425px]"
          />
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-3 gap-6 absolute bottom-[-70px] left-0 right-0 px-8">
          {/* Revenue Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <h2 className="text-lg font-medium">Today's Revenue</h2>
            <p className="text-3xl font-bold">₹15,00,000</p>
            <p className="text-green-400">+4.8% from yesterday</p>
          </div>

          {/* Orders Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <h2 className="text-lg font-medium">Today's Orders</h2>
            <p className="text-3xl font-bold">7,506</p>
            <p className="text-red-400">-3.5% from yesterday</p>
          </div>

          {/* Visitors Card */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <h2 className="text-lg font-medium">Today's Visitors</h2>
            <p className="text-3xl font-bold">17,058</p>
            <p className="text-green-400">+9.3% from yesterday</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-3 gap-6 mb-8 pt-[50px]">
        {/* Line Chart */}
        <div className="col-span-2 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
          <div className="h-64">
            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Returns</h2>
          <div className="h-64">
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Best Selling Products Table */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Best Selling Products</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2">Product ID</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Price(BDT)</th>
              <th className="px-4 py-2">Total Sales</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-700">
              <td className="px-4 py-2">#12598</td>
              <td className="px-4 py-2">
                <img src="/path/to/image.jpg" alt="Product" className="w-10 h-10 rounded-full" />
              </td>
              <td className="px-4 py-2">Off-white shoulder wide shirt</td>
              <td className="px-4 py-2">BTD 4,099</td>
              <td className="px-4 py-2">48</td>
              <td className="px-4 py-2">25</td>
              <td className="px-4 py-2 text-green-400">In Stock</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Overview;
