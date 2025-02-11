'use client';

import useAuthCheck from '/hooks/useAuthCheck';
import { useState } from 'react';
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa"; // Import success icon

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const { user, loading } = useAuthCheck('');

  const showToast = (message) => {
    toast.custom(
      (t) => (
        <div
          className={`flex items-center p-4 rounded-lg bg-gray-900/90 shadow-lg shadow-blue-500/20 border border-gray-700 transition-all duration-300 
          ${t.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
          <FaCheckCircle className="text-green-500" size={20} />
          <span className="text-white ml-3">{message}</span>
        </div>
      ),
      { position: "top-right", duration: 2000 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password, role }),
    });

    const data = await res.json();
    console.log('✅ Register API response:', data);

    if (res.ok) {
      showToast('User registered successfully!'); // Show success toast
      setUsername('');
      setPassword('');
      setRole('user');
    } else {
      showToast(data.message); // Show error message
    }
  };

  // if (loading) {
  //   return <p className="text-center text-gray-500">Loading...</p>;
  // }

  return (
    <div className="max-w-md mx-auto h-fit mt-10 p-6 bg-transparent shadow-lg rounded-lg border border-gray-700">
      <h1 className="text-white text-2xl font-bold mb-4 text-center">Register a User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="user" className="text-white">User</option>
          <option value="admin" className="text-white">Admin</option>
        </select>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-all"
        >
          Register
        </button>
      </form>
    </div>
  );
}
