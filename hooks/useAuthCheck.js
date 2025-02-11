'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function useAuthCheck(requiredPermission = null) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        const data = await res.json();

        console.log("🔍 User Data:", data);
        console.log("🔍 Required Permission:", requiredPermission);

        if (!res.ok) {
          console.warn("⛔ User not authenticated, redirecting to /login");
          router.push('/login'); 
          return;
        }

        // Ensure that permissions are properly checked
        const hasPermission =
          data?.role === 'admin' || 
          (!requiredPermission || (data?.permissions ?? []).includes(requiredPermission));

        console.log("✅ User Has Permission:", hasPermission);

        if (!hasPermission) {
          console.warn("⛔ User does NOT have permission, redirecting to /error");
          router.push('/error'); 
          return;
        }

        setUser(data);
      } catch (error) {
        console.error('🚨 Error checking authentication:', error);
        router.push('/login'); 
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, [router, requiredPermission]);

  return { user, loading };
}
