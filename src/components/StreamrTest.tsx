require('dotenv').config()
import { StreamrClient } from 'streamr-client'
import { useState, useEffect } from 'react';

interface Message {
  // Define the properties of the message here
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
  // ...
  useEffect(() => {
    // Initialize StreamrClient and subscribe here
    if (!process.env.NEXT_PUBLIC_PRIVATE_KEY) {
      throw new Error('PRIVATE_KEY is not set')
    }
    
    const client = new StreamrClient({
      auth: {
        privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
      },
    })
  
    client.subscribe('binance-streamr.eth/BTCUSDT/ticker', (msg: any) => {
      // Handle incoming messages
      console.log('published: ', msg);
      if (isMessage(msg)) {  // Type guard function
        setMessage(msg);
      }
    })
  }, []);

  useEffect(() => {
    console.log('Message state updated:', message);
  }, [message]);
  

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
  <div>
    {message ? (
      <div>
        <p>Price Change: {message.priceChange}</p>
        <p>Price Change Percentage: {message.priceChangePercent}</p>
        <p>Weighted Average Price: {message.weightedAveragePrice}</p>
        <p>Previous Close Price: {message.previousClose}</p>
        <p>Current Close Price: {message.currentClose}</p>
        <p>Close Quantity: {message.closeQuantity}</p>
        <p>Best Bid: {message.bestBid}</p>
        <p>Best Bid Quantity: {message.bestBidQuantity}</p>
        <p>Best Ask Price: {message.bestAskPrice}</p>
        <p>Best Ask Quantity: {message.bestAskQuantity}</p>
        <p>Open Price: {message.open}</p>
        <p>Highest Close Price: {message.high}</p>
        <p>Lowest Close Price: {message.low}</p>
        <p>Base Asset Volume: {message.baseAssetVolume}</p>
        <p>Quote Asset Volume: {message.quoteAssetVolume}</p>
        <p>Trades: {message.trades}</p>
      </div>
    ) : (
      <p>No message yet</p>
    )}
  </div>
);

};