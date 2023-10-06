import React, { useEffect, useState } from 'react';
import { Trade } from '../types';
import { StreamrClient } from 'streamr-client';

type Trade = {
  asset: string | null;
  status: string | null;
  dateOfTrade: string | null;
  spotOrPerp: string | null;
  exchange: string | null;
  direction: string | null;
  timeframe: string | null;
  entryPrice: number | null;
  leverage: number | null;
  dollarValueTraded: number | null;
  tokenQuantity: number | null;
  averageEntry: number | null;
  tp: number | null;
  estTp: number | null;
  sl: number | null;
  estSl: number | null;
  riskReward: number | null;
  closeDollarPrice: number | null;
  fees: number | null;
  pnl: number | null;
  winLoss: string | null;
  lessons: string | null;
  imageNo: string | null;
};


const TradingJourney: React.FC = () => {
  const [client, setClient] = useState<StreamrClient | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [asset, setAsset] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [dateOfTrade, setDateOfTrade] = useState<string | null>(null);
  const [spotOrPerp, setSpotOrPerp] = useState<string | null>(null);
  const [exchange, setExchange] = useState<string | null>(null);
  const [direction, setDirection] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<string | null>(null);
  const [entryPrice, setEntryPrice] = useState<number | null>(null);
  const [leverage, setLeverage] = useState<number | null>(null);
  const [dollarValueTraded, setDollarValueTraded] = useState<number | null>(null);
  const [tokenQuantity, setTokenQuantity] = useState<number | null>(null);
  const [averageEntry, setAverageEntry] = useState<number | null>(null);
  const [tp, setTp] = useState<number | null>(null);
  const [estTp, setEstTp] = useState<number | null>(null);
  const [sl, setSl] = useState<number | null>(null);
  const [estSl, setEstSl] = useState<number | null>(null);
  const [riskReward, setRiskReward] = useState<number | null>(null);
  const [closeDollarPrice, setCloseDollarPrice] = useState<number | null>(null);
  const [fees, setFees] = useState<number | null>(null);
  const [pnl, setPnl] = useState<number | null>(null);
  const [winLoss, setWinLoss] = useState<string | null>(null);
  const [lessons, setLessons] = useState<string | null>(null);
  const [imageNo, setImageNo] = useState<string | null>(null);

  const addTrade = () => {
    const newTrade: Trade = {
      asset,
      status,
      dateOfTrade,
      spotOrPerp,
      exchange,
      direction,
      timeframe,
      entryPrice,
      leverage,
      dollarValueTraded,
      tokenQuantity,
      averageEntry,
      tp,
      estTp,
      sl,
      estSl,
      riskReward,
      closeDollarPrice,
      fees,
      pnl,
      winLoss,
      lessons,
      imageNo,
    };

    console.log('New trade to be added:', newTrade);
    setTrades(prevTrades => {
      if (Array.isArray(prevTrades)) {
        return [...prevTrades, newTrade];
      } else {
        console.error("Previous trades state is not an array:", prevTrades);
        return [newTrade]; // Start a new array with the newTrade
      }
    });

    if (client) {
      client.publish('0x79d8de14cfd661011e2490b9e548f43aef5141e2/TradingJournal', newTrade);
    }
  };

  /**
   * Initialize StreamrClient and subscribe to stream
   */
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PRIVATE_KEY) {
      throw new Error('PRIVATE_KEY is not set')
    }

    const newClient = new StreamrClient({
      auth: {
        privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
      },
    })

    setClient(newClient);

    const subscription = newClient.subscribe(
      {
        stream: '0x79d8de14cfd661011e2490b9e548f43aef5141e2/TradingJournal',
        resend: {
          last: 100, // Number of last messages to resend
        },
      },
      (msg: any) => {
        console.log('published: ', msg);
        setTrades(prevTrades => {
          console.log("Subscription object:", subscription);
          if (Array.isArray(prevTrades)) {
            return [...prevTrades, msg];
          } else {
            console.error("Previous trades are not an array:", prevTrades);
            return [];  // or return an empty array [] if you want to reset the state
          }
        });
      }
    )

    console.log("Subscription object:", subscription);

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe('0x79d8de14cfd661011e2490b9e548f43aef5141e2/TradingJournal');
      } else if (newClient && typeof newClient.unsubscribe === 'function') {
        newClient.unsubscribe('0x79d8de14cfd661011e2490b9e548f43aef5141e2/TradingJournal');
      } else {
        console.error("Could not find a way to unsubscribe.");
      }
    };

  }, []);

  /**
   * Testing
   * @param obj 
   * @returns 
   */
  useEffect(() => {
    console.log("Initial trades state:", trades);
  }, []);

  useEffect(() => {
    console.log("Trades state updated:", trades);
  }, [trades]);


  function isMessage(obj: any): obj is Message {
    return (
      obj &&
      typeof obj.asset === 'string' &&
      typeof obj.status === 'string' &&
      typeof obj.dateOfTrade === 'string' &&
      typeof obj.spotOrPerp === 'string' &&
      typeof obj.exchange === 'string' &&
      typeof obj.direction === 'string' &&
      typeof obj.timeframe === 'string' &&
      typeof obj.entryPrice === 'number' &&
      typeof obj.leverage === 'number' &&
      typeof obj.dollarValueTraded === 'number' &&
      typeof obj.tokenQuantity === 'number' &&
      typeof obj.averageEntry === 'number' &&
      typeof obj.tp === 'number' &&
      typeof obj.estTp === 'number' &&
      typeof obj.sl === 'number' &&
      typeof obj.estSl === 'number' &&
      typeof obj.riskReward === 'number' &&
      typeof obj.closeDollarPrice === 'number' &&
      typeof obj.fees === 'number' &&
      typeof obj.pnl === 'number' &&
      typeof obj.winLoss === 'string' &&
      typeof obj.lessons === 'string' &&
      typeof obj.imageNo === 'string'
    );
  }

  return (
    <div className='h-screen'>
      <div className="text-center text-xl p-4 text-black dark:text-white bg-gray-100 dark:bg-gray-900">
        <div className='container mx-auto'>
          <div className="grid grid-cols-4 gap-4">
            {/* Repeat the following pattern for each input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Asset
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="text"
                onChange={(e) => setAsset(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="text"
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="date"
                onChange={(e) => setDateOfTrade(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Spot or Perp
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="text"
                onChange={(e) => setSpotOrPerp(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Exchange
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="text"
                onChange={(e) => setExchange(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Direction
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="text"
                onChange={(e) => setDirection(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Timeframe
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="text"
                onChange={(e) => setTimeframe(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Entry Price
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="number"
                onChange={(e) => setEntryPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Leverage
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="number"
                onChange={(e) => setLeverage(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Dollar Value
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="number"
                onChange={(e) => setDollarValueTraded(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Token Quantity
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="number"
                onChange={(e) => setTokenQuantity(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Average Entry Price
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="number"
                onChange={(e) => setAverageEntry(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                TP
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="number"
                onChange={(e) => setTp(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Estimated TP
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="number"
                onChange={(e) => setEstTp(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                SL
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="number"
                onChange={(e) => setSl(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Estiamted SL
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="number"
                onChange={(e) => setEstSl(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                R:R
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="number"
                onChange={(e) => setRiskReward(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Close Dollar Price
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="number"
                onChange={(e) => setCloseDollarPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Fees
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="number"
                onChange={(e) => setFees(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                PnL
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="number"
                onChange={(e) => setPnl(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Win or Lost
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="text"
                onChange={(e) => setWinLoss(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Lesson
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="text"
                onChange={(e) => setLessons(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Images
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md dark:bg-gray-800 dark:border-gray-700"
                type="text"
                onChange={(e) => setImageNo(e.target.value)}
              />
            </div>

          </div>

          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addTrade}>Add Trade</button>
          {/* Display table of added trades here */}
        </div>
      </div>
      <div className="text-black dark:text-white mb-4">
        {trades.length > 0 ? (
          <table className="min-w-full bg-white dark:bg-gray-900">
            <thead>
              <tr>
                <th className="text-left py-2 px-3">Asset</th>
                <th className="text-left py-2 px-3">Status</th>
                <th className="text-left py-2 px-3">Date</th>
                <th className="text-left py-2 px-3">Spot or Perp</th>
                <th className="text-left py-2 px-3">Exchange</th>
                <th className="text-left py-2 px-3">Direction</th>
                <th className="text-left py-2 px-3">Timeframe</th>
                <th className="text-left py-2 px-3">Entry Price</th>
                <th className="text-left py-2 px-3">Leverage</th>
                <th className="text-left py-2 px-3">Dollar Value</th>
                <th className="text-left py-2 px-3">Token Quantity</th>
                <th className="text-left py-2 px-3">Average Entry Price</th>
                <th className="text-left py-2 px-3">TP</th>
                <th className="text-left py-2 px-3">Estimated TP</th>
                <th className="text-left py-2 px-3">SL</th>
                <th className="text-left py-2 px-3">Estimated SL</th>
                <th className="text-left py-2 px-3">R:R</th>
                <th className="text-left py-2 px-3">Close Dollar Price</th>
                <th className="text-left py-2 px-3">Fees</th>
                <th className="text-left py-2 px-3">PnL</th>
                <th className="text-left py-2 px-3">Win or Lost</th>
                <th className="text-left py-2 px-3">Lesson</th>
                <th className="text-left py-2 px-3">Images</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, index) => (
                <tr key={index}>
                  <td className="py-2 px-3">{trade.asset}</td>
                  <td className="py-2 px-3">{trade.status}</td>
                  <td className="py-2 px-3">{trade.dateOfTrade}</td>
                  <td className="py-2 px-3">{trade.spotOrPerp}</td>
                  <td className="py-2 px-3">{trade.exchange}</td>
                  <td className="py-2 px-3">{trade.direction}</td>
                  <td className="py-2 px-3">{trade.timeframe}</td>
                  <td className="py-2 px-3">{trade.entryPrice}</td>
                  <td className="py-2 px-3">{trade.leverage}</td>
                  <td className="py-2 px-3">{trade.dollarValueTraded}</td>
                  <td className="py-2 px-3">{trade.tokenQuantity}</td>
                  <td className="py-2 px-3">{trade.averageEntry}</td>
                  <td className="py-2 px-3">{trade.tp}</td>
                  <td className="py-2 px-3">{trade.estTp}</td>
                  <td className="py-2 px-3">{trade.sl}</td>
                  <td className="py-2 px-3">{trade.estSl}</td>
                  <td className="py-2 px-3">{trade.riskReward}</td>
                  <td className="py-2 px-3">{trade.closeDollarPrice}</td>
                  <td className="py-2 px-3">{trade.fees}</td>
                  <td className="py-2 px-3">{trade.pnl}</td>
                  <td className="py-2 px-3">{trade.winLoss}</td>
                  <td className="py-2 px-3">{trade.lessons}</td>
                  <td className="py-2 px-3">{trade.imageNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No trades yet</p>
        )}
      </div>

    </div>
  );
};

export default TradingJourney;