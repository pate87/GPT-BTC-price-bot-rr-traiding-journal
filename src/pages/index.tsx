import React from 'react';
import RiskToRewardCalculator from '../components/RiskToRewardCalculator';
import TradingJourney from '../components/TradingJourney';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Trading App</h1>
      <RiskToRewardCalculator />
      <TradingJourney />
    </div>
  );
};

export default HomePage;
