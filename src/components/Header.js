'use client';

import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import AuthModal from './AuthModal';

export default function Header() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-bold">Crypto Dashboard 🪙</h1>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-700">Ciao, {user.email}</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-1 rounded">
            Accedi
          </button>
        )}
      </div>
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </header>
  );
}
