import React from 'react';
import Link from 'next/link';

const Navbar = ({ toggleTheme, currentTheme }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <a href="#" className="text-2xl font-bold">
          <h1 className="text-2xl font-bold mb-4">BTC Price Stream</h1>
          </a>
        </div>
        <ul className="list-none items-center m-0 p-0 flex">
            <li className="ml-4">
                <Link className="text-white" href="/PriceGPT">
                  Prise GPT
                </Link>
            </li>
            <li className="ml-4">
                <Link className="text-white" href="/RiskToRewardCalculator">
                  Risk To Reward Calculator
                </Link>
            </li>
            <li className="ml-4">
                <Link className="text-white" href="/TradingJourney">
                    Trading Journey
                </Link>
            </li>
        </ul>
        <div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded ${currentTheme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            {currentTheme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
