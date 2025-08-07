import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const dummyProducts = [
  { id: 1, name: "Laptop", category: "Electronics", price: "$1200" },
  { id: 2, name: "Shirt", category: "Clothing", price: "$30" },
  { id: 3, name: "Phone", category: "Electronics", price: "$900" },
  { id: 4, name: "Shoes", category: "Footwear", price: "$60" },
  { id: 5, name: "Watch", category: "Accessories", price: "$150" },
  { id: 6, name: "Headphones", category: "Electronics", price: "$80" },
  { id: 7, name: "Bag", category: "Accessories", price: "$40" },
  { id: 8, name: "Tablet", category: "Electronics", price: "$500" },
];

export default function Products() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const itemsPerPage = 5;

  const filtered = dummyProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const data = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h1 className="text-lg md:text-2xl font-bold mb-4 text-gray-800">📦 Products</h1>

      {/* Search + Add Button */}
      <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-4">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          className="border border-gray-300 p-2 w-full md:w-1/2 rounded-md text-xs md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs md:text-base transition"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs md:text-base">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.id} className="hover:bg-blue-50 transition">
                <td className="p-3 border">{p.name}</td>
                <td className="p-3 border">{p.category}</td>
                <td className="p-3 border">{p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded-md border text-xs md:text-base transition ${
              page === i + 1
                ? "bg-blue-500 text-white shadow"
                : "bg-white hover:bg-blue-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="bg-white w-72 md:w-80 p-4 shadow-2xl border-l border-gray-200">
            <h2 className="text-base md:text-lg font-bold mb-4 text-gray-800">
              ➕ Add Product
            </h2>

            <label className="block mb-1 text-xs md:text-sm text-gray-600">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter product title"
              className="border border-gray-300 p-2 w-full mb-3 text-xs md:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block mb-1 text-xs md:text-sm text-gray-600">
              Description
            </label>
            <textarea
              placeholder="Enter product description"
              className="border border-gray-300 p-2 w-full mb-3 text-xs md:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>

            <label className="block mb-1 text-xs md:text-sm text-gray-600">
              Category
            </label>
            <select className="border border-gray-300 p-2 w-full mb-4 text-xs md:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Footwear</option>
              <option>Accessories</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-3 md:px-4 py-1 md:py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md text-xs md:text-base transition"
              >
                Cancel
              </button>
              <button className="px-3 md:px-4 py-1 md:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs md:text-base transition">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
