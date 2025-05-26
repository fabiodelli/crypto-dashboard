import BitcoinPrice from '../components/BitcoinPrice';
import EthereumPrice from '../components/EthereumPrice';
import TopCryptos from '../components/TopCryptos';
import TopMovers from '../components/TopMovers';
import TopLosers from '../components/TopLosers';
import TradingViewChart from '../components/TradingViewChart';
import AuthForm from '../components/AuthForm';
import Header from '../components/Header';





export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
        <Header />
        <TradingViewChart />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
        <BitcoinPrice />
        <EthereumPrice />
        <TopCryptos  />
        <TopMovers />
        <TopLosers />
  
      </div>
    </main>
  );
}
