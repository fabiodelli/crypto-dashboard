'use client';

import { useEffect, useState } from 'react';

export default function BitcoinPrice() {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        const data = await res.json();
        setPrice(data.bitcoin.usd);
      } catch (error) {
        console.error('Errore nel recupero del prezzo:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 10000); // aggiorna ogni 10 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow text-xl text-gray-800">
      {price ? (
        <p>Prezzo Bitcoin: ${price}</p>
      ) : (
        <p>Caricamento prezzo...</p>
      )}
    </div>
  );
}
