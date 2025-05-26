'use client';

import { useEffect, useState } from 'react';

export default function TopLosers() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchLosers = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=percent_change_24h_asc&per_page=50&page=1&sparkline=false'
        );
        const data = await res.json();
        const losers = data
          .filter((coin) => coin.price_change_percentage_24h < 0)
          .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h) // dal peggiore
          .slice(0, 5);
        setCoins(losers);
      } catch (error) {
        console.error('Errore nel recupero dei top losers:', error);
      }
    };

    fetchLosers();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow text-gray-800">
      <h2 className="text-lg font-bold mb-2">Top Losers 24h</h2>
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
              <span className="text-red-600">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
