// /api/auth/authorise
import { NextResponse } from 'next/server';
import pool from '/lib/db';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  const token = req.cookies.get('token');
  if (!token) return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

    const { userId, path } = await req.json();
    if (!userId || !path) return NextResponse.json({ message: 'Missing data' }, { status: 400 });

    // Option 1: Update JSON column
    await pool.query('UPDATE users SET permissions = JSON_ARRAY_APPEND(permissions, "$", ?) WHERE id = ?', [path, userId]);

    // Option 2: Insert into permissions table
    // await pool.query('INSERT INTO permissions (user_id, path) VALUES (?, ?)', [userId, path]);

    return NextResponse.json({ message: 'Permission granted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
