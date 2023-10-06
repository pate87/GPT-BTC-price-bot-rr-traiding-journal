import React, { useState } from 'react';

const RiskToRewardCalculator: React.FC = () => {
  const [accountValue, setAccountValue] = useState<number>(0.0);
  const [accountPercentValue, setAccountPercentValue] = useState<number>(0.0);
  const [entryPrice, setEntryPrice] = useState<number>(0.0);
  const [stopLossPrice, setStopLossPrice] = useState<number>(0.0);
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(0.0);
  const [calcStopLoss, setCalcStopLoss] = useState<number>(0.0);
  const [calcTakeProfit, setCalcTakeProfit] = useState<number>(0.0);
  const [calcLossDollar, setCalcLossDollar] = useState<number>(0.0);
  const [calcProfitDollar, setCalcProfitDollar] = useState<number>(0.0);

  /**
   * 
   * @param e Gets the Account Size Value from input
   * @dev The function calculates one percent of the input from the user
   */
  const handleAccountValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setAccountValue(newValue);
    /**
     * @dev calculates one percent of the input from the user (newValue * 0.01) and fix it to 2 decimal numbers
     */
    const onePercentAccountValue = parseFloat((newValue * 0.01).toFixed(2));
    setAccountPercentValue(onePercentAccountValue)
    // console.log("Account Value: ", newValue, " 1% SL: ", onePercentAccountValue);
  }

  /**
   * @dev Calculetas the SL, TP, $SL 1%, $TP 1%
   */
  const calculateRiskToReward = () => {
    // Calculates SL
    setCalcStopLoss(entryPrice - stopLossPrice);
    // Calculates TP
    setCalcTakeProfit(takeProfitPrice - entryPrice);
    // Calculates SL and 1% Account Value Size $
    setCalcLossDollar(accountPercentValue / (entryPrice - stopLossPrice));
    // Calculates TP and 1% Account Value Size $
    setCalcProfitDollar((takeProfitPrice - entryPrice) * calcLossDollar);
  };


  const handleSetEntryPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setEntryPrice(newValue);
    // console.log("Entry Price: ", newValue); // Log to console for debugging
  }
  
  const handleStopLossPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setStopLossPrice(newValue);
    // console.log("Stop Loss Price: ", newValue); // Log to console for debugging
  }
  
  const handleTakeProfit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setTakeProfitPrice(newValue);
    // console.log("Take Profit Price: ", newValue); // Log to console for debugging
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-md w-full max-w-md mx-auto mt-10">
    <h1 className="text-2xl font-semibold text-center mb-4 text-black dark:text-white">Risk to Reward Calculator</h1>
    <div className="space-y-4">
      <div>
        <label className="text-black dark:text-white" htmlFor="accountValue">Account Value %:</label>
        <input 
          id="accountValue"
          className="w-full p-2 mt-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          type="number" 
          placeholder="Account Value %" 
          onChange={handleAccountValue} 
        />
      </div>
      <div>
        <label className="text-black dark:text-white" htmlFor="entryPrice">Entry Price:</label>
        <input 
          id="entryPrice"
          className="w-full p-2 mt-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          type="number" 
          placeholder="Entry Price" 
          onChange={handleSetEntryPrice} 
        />
      </div>
      <div>
        <label className="text-black dark:text-white" htmlFor="stopLossPrice">Stop Loss Price:</label>
        <input 
          id="stopLossPrice"
          className="w-full p-2 mt-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          type="number" 
          placeholder="Stop Loss Price" 
          onChange={handleStopLossPrice} 
        />
      </div>
      <div>
        <label className="text-black dark:text-white" htmlFor="takeProfitPrice">Take Profit Price:</label>
        <input 
          id="takeProfitPrice"
          className="w-full p-2 mt-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          type="number" 
          placeholder="Take Profit Price" 
          onChange={handleTakeProfit} 
        />
      </div>
      <button 
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-400 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        onClick={calculateRiskToReward}
      >
        Calculate SL
      </button>
    </div>
    <div className="mt-6 text-black dark:text-white">
      <p>Account: ${accountValue}</p>
      <p>Use 1 % SL: ${accountPercentValue}</p>
      <p>SL: {calcStopLoss.toFixed(2)}%, ${calcLossDollar.toFixed(2)}</p>
      <p>TP: {calcTakeProfit.toFixed(2)}%, ${calcProfitDollar.toFixed(2)}</p>
    </div>
  </div>
  
  );
};

export default RiskToRewardCalculator;