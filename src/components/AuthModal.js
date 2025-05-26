'use client';

import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function AuthModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-sm w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">&times;</button>

        <h2 className="text-xl font-bold mb-4 text-center">
          {mode === 'login' ? 'Accedi' : 'Registrati'}
        </h2>

        <button onClick={handleGoogleLogin} className="w-full bg-red-500 text-white py-2 rounded mb-4">
          Accedi con Google
        </button>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            {mode === 'login' ? 'Accedi' : 'Registrati'}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {mode === 'login' ? (
            <>
              Non hai un account?{' '}
              <button onClick={() => setMode('register')} className="text-blue-600 underline">
                Registrati
              </button>
            </>
          ) : (
            <>
              Hai già un account?{' '}
              <button onClick={() => setMode('login')} className="text-blue-600 underline">
                Accedi
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
