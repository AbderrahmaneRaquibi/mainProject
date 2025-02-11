import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const token = req.cookies.get('token'); // Read the token from cookies

  if (!token) {
    console.log('🚨 No token found in request cookies');
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    console.log('✅ Token decoded:', decoded);

    if (decoded.role !== 'admin') {
      console.log('🚨 User is not an admin:', decoded.role);
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { username, password, role } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [
      username,
      hashedPassword,
      role,
    ]);

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('🚨 Error:', error.message);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
