'use client';

import { useEffect, useState } from 'react';

export default function EthereumPrice() {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        const data = await res.json();
        setPrice(data.ethereum.usd);
      } catch (error) {
        console.error('Errore nel recupero del prezzo ETH:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow text-xl text-gray-800">
      {price ? (
        <p>Prezzo Ethereum: ${price}</p>
      ) : (
        <p>Caricamento prezzo...</p>
      )}
    </div>
  );
}
