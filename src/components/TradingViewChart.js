'use client';

import { useEffect, useRef, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { saveUserPreferences } from '../lib/savePreferences';

const symbols = [
  { label: 'Bitcoin (BTC)', value: 'BINANCE:BTCUSDT' },
  { label: 'Ethereum (ETH)', value: 'BINANCE:ETHUSDT' },
  { label: 'Cardano (ADA)', value: 'BINANCE:ADAUSDT' },
  { label: 'Solana (SOL)', value: 'BINANCE:SOLUSDT' },
  { label: 'XRP', value: 'BINANCE:XRPUSDT' }
];

export default function TradingViewChart() {
  const [selectedSymbol, setSelectedSymbol] = useState(symbols[0].value);
  const [user, setUser] = useState(null);
  const containerId = 'tradingview_dynamic';
  const containerRef = useRef(null);

  const loadWidget = (symbol) => {
    if (!window.TradingView) return;
    containerRef.current.innerHTML = '';

    new window.TradingView.widget({
      autosize: true,
      symbol: symbol,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'light',
      style: '1',
      locale: 'it',
      container_id: containerId
    });
  };

  // ✅ Carica l'utente e la preferenza salvata
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => loadWidget(selectedSymbol);
    document.head.appendChild(script);

    onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const ref = doc(db, 'users', firebaseUser.uid);
        const snap = await getDoc(ref);
        const saved = snap.data()?.preferences?.selectedCoin;
        if (saved) {
          setSelectedSymbol(saved); // solo carica
        }
      }
    });
  }, []);

  // ✅ Cambia il grafico ogni volta che cambia selectedSymbol
  useEffect(() => {
    if (window.TradingView) {
      loadWidget(selectedSymbol);
    }
  }, [selectedSymbol]);

  // ✅ Salva solo se l’utente cambia la coin manualmente
  const handleChange = async (e) => {
    const newSymbol = e.target.value;
    setSelectedSymbol(newSymbol);
    if (user) {
      await saveUserPreferences(user.uid, {
        selectedCoin: newSymbol
      });
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow text-gray-800">
      <h2 className="text-lg font-bold mb-4">Grafico Interattivo</h2>

      <select
        value={selectedSymbol}
        onChange={handleChange}
        className="mb-4 p-2 border rounded"
      >
        {symbols.map((coin) => (
          <option key={coin.value} value={coin.value}>
            {coin.label}
          </option>
        ))}
      </select>

      <div id={containerId} ref={containerRef} style={{ height: 400 }} />
    </div>
  );
}
