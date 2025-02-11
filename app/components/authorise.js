'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

export default function AuthorisePage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [path, setPath] = useState('');
  const router = useRouter();

  const showToast = (message, icon) => {
    toast.custom(
      (t) => (
        <div
          className={`flex items-center p-4 rounded-lg bg-gray-900/90 shadow-lg shadow-blue-500/20 border border-gray-700 transition-all duration-300 
          ${t.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
          {icon}
          <span className="text-white ml-3">{message}</span>
        </div>
      ),
      { position: "top-right", duration: 2000 }
    );
  };

  useEffect(() => {
    const checkAdmin = async () => {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      const data = await res.json();

      if (!res.ok || data.role !== 'admin' ) {
        router.push('/error'); // Redirect if not admin
      } else {
        fetchUsers();
      }
    };

    checkAdmin();
  }, [router]);

  const fetchUsers = async () => {
    const res = await fetch('/api/auth/users', { credentials: 'include' });
    const data = await res.json();
    setUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/authorise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ userId: selectedUser, path }),
    });

    const user = users.find((user) => user.id === selectedUser);
    if (res.ok && user) {
      fetchUsers();
      showToast(`Granted ${path} to ${user.username}`, <FaCheckCircle className="text-green-500" size={20} />);
    }
  };

  return (
    <div className="flex flex-col h-fit max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg border border-gray-700">
      <h1 className="text-white text-2xl font-bold mb-4 text-center">Authorize User Access</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow">
        <select
          onChange={(e) => setSelectedUser(e.target.value)}
          value={selectedUser}
          className="p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        >
          <option value="">Select User</option>
          {users.length > 0 ? (
            users.map((user) => (
              <option key={user.id} value={user.id} className="text-white">
                {user.username}
              </option>
            ))
          ) : (
            <option value="">No users found</option>
          )}
        </select>
        <input
          type="text"
          placeholder="Enter path (e.g., /reports)"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          className="p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-all mt-5"
        >
          Grant Access
        </button>
      </form>
    </div>
  );
}
