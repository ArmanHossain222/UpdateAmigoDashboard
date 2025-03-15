import React, { useState } from "react";

const Transactions = () => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    // Logic to add a new product to the list (you can implement API calls here)
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <input
          type="text"
          placeholder="Search products..."
          className="bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {/* Add New Product Section */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Product Name"
            className="bg-gray-700 text-white px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Category"
            className="bg-gray-700 text-white px-4 py-2 rounded"
            required
          />
          <textarea
            placeholder="Description"
            className="bg-gray-700 text-white px-4 py-2 rounded col-span-2"
          ></textarea>
          <input
            type="number"
            placeholder="Price"
            className="bg-gray-700 text-white px-4 py-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Stock Quantity"
            className="bg-gray-700 text-white px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="SKU/Product ID"
            className="bg-gray-700 text-white px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            className="bg-gray-700 text-white px-4 py-2 rounded"
          />
          <input
            type="file"
            multiple
            className="bg-gray-700 text-white px-4 py-2 rounded col-span-2"
          />
          <button
            type="submit"
            className="col-span-2 bg-blue-600 px-4 py-2 rounded text-white font-bold hover:bg-blue-700"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Product Inventory Table */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Product Inventory</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2">Product ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-700">
                <td className="px-4 py-2">{product.id}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td
                  className={`px-4 py-2 ${
                    product.stock > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </td>
                <td className="px-4 py-2">
                  <button className="text-blue-400 hover:underline mr-2">
                    Edit
                  </button>
                  <button className="text-red-400 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
