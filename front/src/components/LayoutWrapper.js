'use client';

import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const authPages = ['/login', '/register'];
const publicPages = ['/'];

export default function LayoutWrapper({ children }) {
  const { isLoggedIn, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = authPages.includes(pathname);
  const isPublicPage = publicPages.includes(pathname);

  useEffect(() => {
    if (loading) return;
    // Redirect logged-in users away from login/register
    if (isLoggedIn && isAuthPage) {
      router.replace('/dashboard');
    }
    // Redirect unauthenticated users away from protected pages (not public, not auth)
    if (!isLoggedIn && !isAuthPage && !isPublicPage) {
      router.replace('/login');
    }
  }, [isLoggedIn, loading, isAuthPage, isPublicPage, router]);

  // Loading state
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(160deg, #010d06 0%, #064E3B 50%, #0d9466 100%)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #10b981, #007A3D)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', boxShadow: '0 8px 30px rgba(16,185,129,0.3)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}>
            <span style={{ fontSize: '28px' }}>💚</span>
          </div>
          <p style={{ color: 'rgba(167,243,208,0.6)', fontSize: '14px', fontWeight: 500 }}>Loading Takaful...</p>
        </div>
      </div>
    );
  }

  // Auth pages — no navbar/footer
  if (isAuthPage) {
    if (isLoggedIn) return null; // will redirect to /
    return <>{children}</>;
  }

  // Protected pages — must be logged in
  if (!isLoggedIn && !isPublicPage) return null; // will redirect to /login

  return (
    <>
      <div className="palestine-stripe" />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
