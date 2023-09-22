import React, { useState } from 'react';

const RiskToRewardCalculator: React.FC = () => {
  const [entryPrice, setEntryPrice] = useState<number>(0);
  const [stopLossPrice, setStopLossPrice] = useState<number>(0);
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(0);

  const calculateRiskToReward = () => {
    // Your calculation logic here...
  };

  return (
    <div className="text-center text-xl p-4 text-black dark:text-white">
      <input className="text-center text-black" type="number" placeholder="Entry Price" onChange={(e) => setEntryPrice(parseFloat(e.target.value))} />
      <input className="text-center text-black" type="number" placeholder="Stop Loss Price" onChange={(e) => setStopLossPrice(parseFloat(e.target.value))} />
      <input className="text-center text-black" type="number" placeholder="Take Profit Price" onChange={(e) => setTakeProfitPrice(parseFloat(e.target.value))} />
      <button onClick={calculateRiskToReward}>Calculate</button>
      {/* Display calculated values here */}
    </div>
  );
};

export default RiskToRewardCalculator;

