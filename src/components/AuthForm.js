'use client';

import { useState } from 'react';
import { auth } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('login'); // o 'register'
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'login') {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setUser(result.user);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        setUser(result.user);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-sm mx-auto">
      {user ? (
        <div className="text-center">
          <p className="mb-2">Bentornato, {user.email}</p>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold text-center">
            {mode === 'login' ? 'Login' : 'Registrati'}
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">
            {mode === 'login' ? 'Accedi' : 'Registrati'}
          </button>

          <p className="text-sm text-center text-gray-600">
            {mode === 'login' ? (
              <>
                Non hai un account?{' '}
                <button type="button" onClick={() => setMode('register')} className="text-blue-600 underline">
                  Registrati
                </button>
              </>
            ) : (
              <>
                Hai già un account?{' '}
                <button type="button" onClick={() => setMode('login')} className="text-blue-600 underline">
                  Accedi
                </button>
              </>
            )}
          </p>
        </form>
      )}
    </div>
  );
}
