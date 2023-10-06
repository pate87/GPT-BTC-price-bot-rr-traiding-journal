# BTC Price bot and Risk to Reward Calculator

This app is a BTC price bot. To ask GPT whether to buy or to sell at the current price with all necessary information.

## How to use BTC price bot

GPT price bot that fetches the Binance Prices of BTC 

Ask the bot about the btc price and you'll get an answer.

## Risk To Reward

This app has also a Risk To Reward calculator included.

Usually the main problem is how to calculate a SL on the current account value.

I solved this problem.

Just insert your current account value and stops loss and take profit.

The calculator is set to 1% account value and returns the amount to invest to only loss 1% of the account value.

## Trading Journal with Streamr API Integration

This project is a web-based trading journal that allows users to log their trades, view them in a table format, and leverage the Streamr API for real-time data streaming. Built with Next.js, the application uses React functional components, hooks, and state management to provide a seamless user experience.

## Features
Log trades with multiple attributes like asset, date, entry price, etc.
View all logged trades in a table format
Real-time data streaming using Streamr API
Dark mode UI

## Prerequisites
Node.js >= 14.x
npm >= 6.x
Streamr account and a corresponding private key

### Install Dependencies

Clone the Repository
```bash
git clone https://github.com/yourusername/trading-journal.git
```

Navigate to the project folder and install the dependencies.

Download the files and run
```
npm install
```

## Start the Development Server - Next.js

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

Create a `.env.local` file in the root directory and add your Streamr private key.


```bash 
NEXT_PUBLIC_PRIVATE_KEY=your_streamr_private_key_here
```

## Code Structure
`pages/:` Contains the Next.js pages including the main 

`TradingJourney.tsx` component.

`components/:` Reusable React components like tables, buttons, etc.

`types/:` Type definitions and interfaces.

`utils/:` Helper functions and utilities.

## Key Files

`TradingJourney.tsx:` Main component where trades are logged and viewed.

`StreamrClientConfig.ts:` Streamr API configuration and setup.

`TradeTable.tsx:` Component for rendering the trade table.

## API Integration
The Streamr API is used for real-time data streaming. Trades are published to a Streamr stream, and the application subscribes to updates from this stream.

- Publishing a Trade: When a new trade is added, it gets published to the Streamr stream.
- Subscribing to a Stream: The application subscribes to the Streamr stream to receive real-time updates.

## Contributing

Feel free to fork the project, open issues, and create pull requests.



