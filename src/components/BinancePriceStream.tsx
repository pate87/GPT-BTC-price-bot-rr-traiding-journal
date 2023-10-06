require('dotenv').config()
import { StreamrClient } from 'streamr-client';
import { useState, useEffect } from 'react';

interface Message {
  priceChange: number,
  priceChangePercent: number,
  weightedAveragePrice: number,
  previousClose: number,
  currentClose: number,
  closeQuantity: number,
  bestBid: number,
  bestBidQuantity: number,
  bestAskPrice: number,
  bestAskQuantity: number,
  open: number,
  high: number
  low: number,
  baseAssetVolume: number,
  quoteAssetVolume: number,
  trades: number,
}

export const BinancePriceStream = () => {

  const [message, setMessage] = useState<Message | null>(null);
  const [priceReport, setPriceReport] = useState<string | null>(null);
  const [userInput, setUserInput] = useState<string | null>(null);



  const handleSubmit = async () => {
    if (userInput.toLowerCase().includes("btc price")) {
      // Make the API call here
      const response = fetch('/api/generateReport', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }), // Current message from Streamr
      })
        .then(response => response.json())
        .then(data => {
          setPriceReport(data.priceReport);
        });
        return message;
    }
  };
  

  /**
   * Initialize StreamrClient and subscribtion
   */
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PRIVATE_KEY) {
      throw new Error('PRIVATE_KEY is not set')
    }

    const client = new StreamrClient({
      auth: {
        privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
      },
    })

    client.subscribe('binance-streamr.eth/BTCUSDT/ticker', async (msg: any) => {
      // Handle incoming messages
      // console.log('published: ', msg);
      if (isMessage(msg)) {  // Type guard function
        setMessage(msg);
      }
    })
  }, []);

  function isMessage(obj: any): obj is Message {
    return (
      obj &&
      typeof obj.priceChange === 'number' &&
      typeof obj.priceChangePercent === 'number' &&
      typeof obj.weightedAveragePrice === 'number' &&
      typeof obj.previousClose === 'number' &&
      typeof obj.currentClose === 'number' &&
      typeof obj.closeQuantity === 'number' &&
      typeof obj.bestBid === 'number' &&
      typeof obj.bestBidQuantity === 'number' &&
      typeof obj.bestAskPrice === 'number' &&
      typeof obj.bestAskQuantity === 'number' &&
      typeof obj.open === 'number' &&
      typeof obj.high === 'number' &&
      typeof obj.low === 'number' &&
      typeof obj.baseAssetVolume === 'number' &&
      typeof obj.quoteAssetVolume === 'number' &&
      typeof obj.trades === 'number'
    );
  }

  return (
    <div className='h-screen'>
    <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-md w-full max-w-md mx-auto mt-10">
  <h1 className="text-2xl font-semibold text-center mb-4 text-black dark:text-white">Bitcoin Price Report</h1>
  <div className="space-y-4">
    <div className="text-black dark:text-white mb-4">
      {priceReport ? <p>{priceReport}</p> : <p>No report yet</p>}
    </div>
    <div>
      <label className="text-black dark:text-white" htmlFor="btcPriceQuery">Ask about BTC price:</label>
      <input 
        id="btcPriceQuery"
        className="w-full p-2 mt-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
        type="text" 
        value={userInput} 
        onChange={(e) => setUserInput(e.target.value)} 
        placeholder="Ask about BTC price" 
      />
    </div>
    <button 
      className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-400 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
      onClick={handleSubmit}
    >
      Submit
    </button>
  </div>
</div>
</div>

  );

};