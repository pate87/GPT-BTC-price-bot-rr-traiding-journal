import React from 'react';
// import RiskToRewardCalculator from '../components/RiskToRewardCalculator';
// import TradingJourney from '../components/TradingJourney';
import { BinancePriceStream } from '@/components/BinancePriceStream';

const HomePage: React.FC = () => {
  return (
    <div>
      
      <BinancePriceStream />
      {/* <RiskToRewardCalculator /> */}
      {/* <TradingJourney /> */}
    </div>
  );
};

export default HomePage;
