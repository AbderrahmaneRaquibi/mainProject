// /api/auth/me
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool  from '/lib/db'; // Ensure this points to your MySQL connection

export async function GET(req) {
  const token = req.cookies.get('token'); // Ensure token is read from cookies

  if (!token) {
    console.log('🚨 No token found in /api/auth/me');
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

    // Fetch user data, including permissions
    const [user] = await pool.query('SELECT username, role, permissions FROM users WHERE id = ?', [decoded.id]);

    if (!user.length) {
      console.log('🚨 User not found in database');
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const userData = user[0];

    // Ensure permissions is always an array (parse JSON if stored as JSON string)
    const permissions = userData.permissions ? JSON.parse(userData.permissions) : [];

    console.log('✅ User info:', { username: userData.username, role: userData.role, permissions });

    return NextResponse.json({
      username: userData.username,
      role: userData.role,
      permissions, // Include permissions in the response
    });
  } catch (error) {
    console.log('🚨 Invalid token in /api/auth/me', error);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}