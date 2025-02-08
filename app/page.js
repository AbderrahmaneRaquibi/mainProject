'use client';
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);

  // Handle edit user
  const handleEdit = (userId) => {
    console.log(`Edit user with ID: ${userId}`);
    // Add logic for editing the user
  };

  // Handle delete user
  const handleDelete = (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      console.log(`Delete user with ID: ${userId}`);
      // Add logic for deleting the user
    }
  };

  return (
    <div className="overflow-x-auto w-[50%]">
      <table className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Role</th>
            {/* <th className="px-4 py-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b text-center">
              <td className="px-4 py-2 text-black">{user.id}</td>
              <td className="px-4 py-2 text-black">{user.username}</td>
              <td className="px-4 py-2 text-black">{user.role}</td>
              {/* <td className="px-4 py-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                {' | '}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
