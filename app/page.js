"use client";
import { useEffect, useState } from 'react';
import useAuthCheck from '/hooks/useAuthCheck';
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import AuthorisePage from './components/authorise';
import Register from './components/register';

export default function Home() {
  const { user, loading } = useAuthCheck(); // Removed '/' as requiredPermission
  const [loadingToastId, setLoadingToastId] = useState(null);

  const showToast = (message, icon, duration) => {
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
      { position: "top-right", duration: duration }
    );
  };

  useEffect(() => {
    if (!loading && user) {
      showToast(
        `Welcome back, ${user.username}!`,
        <FaCheckCircle className="text-green-500" size={20} />,
        2000
      );

      if (loadingToastId) {
        toast.dismiss(loadingToastId);
      }
    }
  }, [loading, user, loadingToastId]);

  return (
    <div className="flex flex-col space-y-12">
      {/* Admin Controls */}
      <div className='flex space-x-3'>
        {user?.role === "admin" && (
          <div id="auth"><AuthorisePage /></div>
        )}
        {(user?.role === "admin" || user?.permissions?.includes("#register")) && (
          <div id="register"><Register /></div>
        )}
      </div>

      {/* Display Username if authorized */}
      <div>
        {(user?.role === "admin" || user?.permissions?.includes("#register")) && (
          <div>{user?.username}</div>
        )}
      </div>
    </div>
  );
}
