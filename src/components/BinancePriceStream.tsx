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

      const data = await response.json();
      setPriceReport(data.priceReport);
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
    <div style={{ height: 'calc(100vh - 100px)' }} className="flex flex-col justify-end bg-gray-900 bg-gray-100 dark:bg-gray-800">
     {/* <div className="mt-6"> */}
      {/* <div className="mt-4"> */}
        {priceReport ? <p>{priceReport}</p> : <p>No report yet</p>}
      {/* </div> */}
    {/* </div> */}

      <div className='flex flex-col justify-around '>
      <input
        className="bg-gray-800 p-2 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-200 dark:text-black"
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask about BTC price"
      />
      <button
      className="bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700"
       onClick={handleSubmit}>Submit</button>
      </div>
      
    </div>
  );

};