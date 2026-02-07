import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { findUserById } from '@/models/User';

// Extracts and verifies the logged-in user from the Authorization header
export async function getAuthUser(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) return null;

  const user = await findUserById(decoded.userId);
  return user;
}

// Returns a 401 response
export function unauthorized() {
  return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
}
