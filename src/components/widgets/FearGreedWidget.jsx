'use client';

import { useEffect, useState } from 'react';

const getLabel = (value) => {
  const num = parseInt(value);
  if (num >= 75) return 'Extreme Greed';
  if (num >= 50) return 'Greed';
  if (num >= 25) return 'Fear';
  return 'Extreme Fear';
};

const getColor = (value) => {
  const num = parseInt(value);
  if (num >= 75) return 'bg-green-700';
  if (num >= 50) return 'bg-green-500';
  if (num >= 25) return 'bg-yellow-400';
  return 'bg-red-500';
};

export default function FearGreedWidget() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndex = async () => {
      try {
        const res = await fetch('https://api.alternative.me/fng/');
        const json = await res.json();
        setData(json.data[0]);
      } catch (err) {
        console.error('Errore nel recupero Fear & Greed Index:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIndex();
  }, []);

  if (loading) return <div className="p-4 bg-white rounded shadow">Caricamento...</div>;
  if (!data) return <div className="p-4 bg-white rounded shadow">Dati non disponibili</div>;

  const label = getLabel(data.value);
  const color = getColor(data.value);

  return (
    <div className={`p-4 rounded shadow text-white ${color}`}>
      <h2 className="text-lg font-bold mb-2">Fear & Greed Index</h2>
      <div className="text-4xl font-extrabold">{data.value}</div>
      <div className="text-md mt-1">{label}</div>
      <div className="text-sm mt-2 italic text-white/80">
        Aggiornato il {data.timestamp ? new Date(data.timestamp * 1000).toLocaleDateString() : 'N/D'}
      </div>
    </div>
  );
}
