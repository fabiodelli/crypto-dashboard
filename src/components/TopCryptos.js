'use client';

import { useEffect, useState } from 'react';

export default function TopCryptos() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchTopCoins = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false'
        );
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error('Errore nel recupero delle criptovalute:', error);
      }
    };

    fetchTopCoins();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow text-gray-800">
      <h2 className="text-lg font-bold mb-2">Top 5 Criptovalute</h2>
      {coins.length === 0 ? (
        <p>Caricamento...</p>
      ) : (
        <ul className="space-y-2">
          {coins.map((coin) => (
            <li key={coin.id} className="flex justify-between items-center border-b pb-1">
              <div className="flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
              </div>
              <span>${coin.current_price.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
