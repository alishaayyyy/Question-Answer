import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const dummyUsers = [
  { id: 1, name: "Alisha", email: "alisha@example.com" },
  { id: 2, name: "Ahmed", email: "ahmed@example.com" },
  { id: 3, name: "Sara", email: "sara@example.com" },
  { id: 4, name: "Ali", email: "ali@example.com" },
  { id: 5, name: "Hina", email: "hina@example.com" },
  { id: 6, name: "Omer", email: "omer@example.com" },
];

export default function Users() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const itemsPerPage = 5;

  const filtered = dummyUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const data = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleEditClick = (user) => {
    setEditUser(user);
    setIsDrawerOpen(true);
  };

  const handleDeleteClick = (user) => {
    alert(`Deleting user: ${user.name}`);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h1 className="text-lg md:text-2xl font-bold mb-4 text-gray-800">👥 Users</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="🔍 Search by name or email..."
        className="border border-gray-300 p-2 mb-4 w-full rounded-md text-xs md:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-xs md:text-base">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u) => (
              <tr key={u.id} className="hover:bg-blue-50 transition">
                <td className="p-3 border">{u.name}</td>
                <td className="p-3 border">{u.email}</td>
                <td className="p-3 border text-center flex justify-center gap-4">
                  <FaEdit
                    className="text-blue-500 cursor-pointer hover:scale-110 transition"
                    onClick={() => handleEditClick(u)}
                  />
                  <FaTrash
                    className="text-red-500 cursor-pointer hover:scale-110 transition"
                    onClick={() => handleDeleteClick(u)}
                  />
                </td>
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
          {/* Drawer Box */}
          <div className="bg-white w-72 md:w-80 p-4 shadow-2xl border-l border-gray-200">
            <h2 className="text-base md:text-lg font-bold mb-4 text-gray-800">
              ✏️ Edit User
            </h2>

            <label className="block mb-1 text-xs md:text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              defaultValue={editUser.name}
              className="border border-gray-300 p-2 w-full mb-3 text-xs md:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="block mb-1 text-xs md:text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              defaultValue={editUser.email}
              className="border border-gray-300 p-2 w-full mb-4 text-xs md:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

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
