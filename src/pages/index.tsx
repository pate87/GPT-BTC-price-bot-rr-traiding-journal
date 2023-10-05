import React from 'react';
import RiskToRewardCalculator from '../components/RiskToRewardCalculator';
import TradingJourney from '../components/TradingJourney';
import { BinancePriceStream } from '@/components/StreamrTest';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Trading App</h1>
      <BinancePriceStream />
      <RiskToRewardCalculator />
      <TradingJourney />
    </div>
  );
};

export default HomePage;
