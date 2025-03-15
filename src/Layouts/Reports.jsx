import React, { useState } from "react";

const ReportsPage = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2024-01-01",
      customer: "John Doe",
      amount: 120.5,
      status: "Completed",
      paymentMethod: "Credit Card",
    },
    {
      id: 2,
      date: "2024-01-02",
      customer: "Jane Smith",
      amount: 75.0,
      status: "Pending",
      paymentMethod: "PayPal",
    },
    {
      id: 3,
      date: "2024-01-03",
      customer: "Alice Johnson",
      amount: 200.0,
      status: "Refunded",
      paymentMethod: "Bank Transfer",
    },
  ]);

  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    status: "",
    paymentMethod: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    // Logic to filter transactions based on filters
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">E-commerce Reports</h1>
        <button className="bg-blue-600 px-4 py-2 rounded font-bold hover:bg-blue-700">
          Export Report
        </button>
      </div>

      {/* Key Metrics Section */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold">$395.5</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Total Transactions</h3>
          <p className="text-2xl font-bold">{transactions.length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold">Pending Transactions</h3>
          <p className="text-2xl font-bold">
            {transactions.filter((t) => t.status === "Pending").length}
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-4 gap-4">
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleFilterChange}
            className="bg-gray-700 text-white px-4 py-2 rounded"
            placeholder="Date From"
          />
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleFilterChange}
            className="bg-gray-700 text-white px-4 py-2 rounded"
            placeholder="Date To"
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
          <select
            name="paymentMethod"
            value={filters.paymentMethod}
            onChange={handleFilterChange}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            <option value="">All Payment Methods</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <button
          onClick={applyFilters}
          className="mt-4 bg-blue-600 px-4 py-2 rounded text-white font-bold hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Transaction Report</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-700">
                <td className="px-4 py-2">{transaction.id}</td>
                <td className="px-4 py-2">{transaction.date}</td>
                <td className="px-4 py-2">{transaction.customer}</td>
                <td className="px-4 py-2">${transaction.amount.toFixed(2)}</td>
                <td
                  className={`px-4 py-2 ${
                    transaction.status === "Completed"
                      ? "text-green-400"
                      : transaction.status === "Pending"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {transaction.status}
                </td>
                <td className="px-4 py-2">{transaction.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
