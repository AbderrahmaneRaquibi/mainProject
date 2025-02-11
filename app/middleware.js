import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '/lib/db';

export async function middleware(req) {
  const token = req.cookies.get('token');
  if (!token) return NextResponse.redirect(new URL('/login', req.url));

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);

    // Fetch user permissions from the database
    const [user] = await pool.query('SELECT permissions FROM users WHERE id = ?', [decoded.id]);

    // Ensure permissions are parsed correctly
    const allowedPaths = JSON.parse(user[0]?.permissions || '[]');

    // Check if user has access or is an admin
    if (!allowedPaths.includes(req.nextUrl.pathname) && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Apply middleware to protected routes
export const config = {
  matcher: ['/register'], // Add paths to protect
};
