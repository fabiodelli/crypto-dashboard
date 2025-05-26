'use client';

import { useEffect, useRef, useState } from 'react';

const symbols = [
  { label: 'Bitcoin (BTC)', value: 'BINANCE:BTCUSDT' },
  { label: 'Ethereum (ETH)', value: 'BINANCE:ETHUSDT' },
  { label: 'Cardano (ADA)', value: 'BINANCE:ADAUSDT' },
  { label: 'Solana (SOL)', value: 'BINANCE:SOLUSDT' },
  { label: 'XRP', value: 'BINANCE:XRPUSDT' }
];

export default function TradingViewChart() {
  const [selectedSymbol, setSelectedSymbol] = useState(symbols[0].value);
  const containerId = 'tradingview_dynamic';
  const containerRef = useRef(null);

  const loadWidget = (symbol) => {
    if (!window.TradingView) return;

    containerRef.current.innerHTML = ''; // pulisce il div

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

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => loadWidget(selectedSymbol);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (window.TradingView) {
      loadWidget(selectedSymbol);
    }
  }, [selectedSymbol]);

  return (
    <div className="p-4 bg-white rounded shadow text-gray-800">
      <h2 className="text-lg font-bold mb-4">Grafico Interattivo</h2>

      <select
        value={selectedSymbol}
        onChange={(e) => setSelectedSymbol(e.target.value)}
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
