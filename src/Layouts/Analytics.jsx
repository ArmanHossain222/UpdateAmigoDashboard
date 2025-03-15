import React from "react";

const Analysis = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen w-full overflow-auto">
      {/* Page Header */}
      <header className="flex justify-between items-center p-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold">Analysis</h1>
        <input
          type="text"
          placeholder="Search analytics..."
          aria-label="Search analytics"
          className="bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 w-64 max-w-full"
        />
      </header>

      {/* Metrics Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {[
          { title: "Total Sales", value: "$25,340", color: "text-green-400" },
          { title: "Orders", value: "1,032", color: "text-blue-400" },
          { title: "Conversion Rate", value: "3.5%", color: "text-yellow-400" },
        ].map((metric, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{metric.title}</h2>
            <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
          </div>
        ))}
      </section>

      {/* Sales & Traffic Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Top Products */}
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Top Products</h2>
          <ul>
            {[
              { name: "Wireless Headphones", sales: "$5,200" },
              { name: "Smartwatch", sales: "$3,800" },
              { name: "Bluetooth Speaker", sales: "$2,400" },
            ].map((product, index) => (
              <li
                key={index}
                className="flex justify-between border-b border-gray-700 py-2"
              >
                <span>{product.name}</span>
                <span className="font-bold">{product.sales}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Traffic Sources */}
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Traffic Sources</h2>
          <ul>
            {[
              { source: "Organic Search", percent: "60%" },
              { source: "Social Media", percent: "25%" },
              { source: "Referral", percent: "10%" },
              { source: "Others", percent: "5%" },
            ].map((traffic, index) => (
              <li
                key={index}
                className="flex justify-between border-b border-gray-700 py-2"
              >
                <span>{traffic.source}</span>
                <span className="font-bold">{traffic.percent}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Recent Orders */}
      <section className="bg-gray-800 p-6 rounded-lg mx-6 mb-6 shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "ORD12345",
                customer: "John Doe",
                amount: "$120",
                status: "Completed",
                date: "2024-12-20",
              },
              {
                id: "ORD12346",
                customer: "Jane Smith",
                amount: "$85",
                status: "Pending",
                date: "2024-12-22",
              },
              {
                id: "ORD12347",
                customer: "Mike Lee",
                amount: "$230",
                status: "Cancelled",
                date: "2024-12-18",
              },
            ].map((order, index) => (
              <tr
                key={index}
                className="hover:bg-gray-700 border-b border-gray-700"
              >
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.amount}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    order.status === "Completed"
                      ? "text-green-400"
                      : order.status === "Pending"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {order.status}
                </td>
                <td className="px-4 py-2">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Analysis;
