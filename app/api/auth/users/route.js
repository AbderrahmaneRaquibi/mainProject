import { NextResponse } from 'next/server';
import pool from '/lib/db';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  const token = req.cookies.get('token');
  if (!token) return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

    // ✅ Allow admins to see all users immediately
    if (decoded.role === 'admin') {
      const [users] = await pool.query('SELECT id, username FROM users');
      return NextResponse.json(users);
    }

    // 🔹 Check if user has the `#auth` permission
    const [userPermissions] = await pool.query(
      'SELECT path FROM user_permissions WHERE user_id = ?',
      [decoded.id]
    );

    const userPaths = userPermissions.map((perm) => perm.path);
    console.log("User Permissions:", userPaths); // Debugging

    // ✅ Allow users who have access to `#auth`
    if (userPaths.includes('#auth')) {
      const [users] = await pool.query('SELECT id, username FROM users');
      return NextResponse.json(users);
    }

    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
