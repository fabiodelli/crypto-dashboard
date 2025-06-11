'use client';

import { useEffect, useState } from 'react';

export default function CryptoNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/cryptonews');
        const data = await res.json();
        setNews(data.results || []);
      } catch (error) {
        console.error('❌ Errore nel recupero delle notizie:', error);
      }
    };
  
    fetchNews();
  }, []);
  

  return (
    <div className="p-4 bg-white rounded shadow text-gray-800">
      <h2 className="text-lg font-bold mb-4">Notizie Crypto</h2>
      <ul className="space-y-4">
        {news.map((item) => (
          <li key={item.id} className="border-b pb-2">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:underline"
            >
              {item.title}
            </a>
            <p className="text-sm text-gray-600">{item.published_at.slice(0, 10)} — {item.domain}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
