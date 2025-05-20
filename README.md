# Multi-Chain Balance Checker

Live Demo: [https://balance-checker-khaki.vercel.app/](https://balance-checker-khaki.vercel.app/)

This app lets you check crypto balances across multiple blockchains with one Ethereum address.

## Features

- Check ETH, USDC, and LINK on 5 chains at once
- Works on Ethereum, Polygon, Arbitrum, Base, and BNB Chain
- Mobile friendly design with smooth animations
- 60 second cache to reduce API calls
- Clean component structure
- Well formatted balance displays

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **Backend**: Node.js, Express, TypeScript
- **API**: Alchemy

## Project Structure

```
balance-checker/
├── frontend/              # Next.js app
│   ├── public/            # Static files
│   ├── src/
│   │   ├── app/           # Pages
│   │   ├── components/    # UI components
│   │   ├── hooks/         # React hooks
│   │   └── utils/         # Helper functions
├── backend/               # Express API
    ├── src/
    │   ├── controllers/   # Request handlers
    │   ├── routes/        # API routes
    │   ├── services/      # Business logic
    │   ├── types.ts       # Type definitions
    │   └── index.ts       # Server entry
```

## Setup

### Backend

1. Go to backend folder:
   ```
   cd backend
   ```

2. Install packages:
   ```
   npm install
   ```

3. Make a `.env` file:
   ```
   PORT=3001
   NODE_ENV=development
   ALCHEMY_API_KEY=your_key_here
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend

1. Go to frontend folder:
   ```
   cd frontend
   ```

2. Install packages:
   ```
   npm install
   ```

3. Make a `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. Start the app:
   ```
   npm run dev
   ```

5. Open `http://localhost:3000`

## API

### Get Balance

- **URL**: `/api/balance`
- **Method**: `GET`
- **Query**: `address` (Ethereum address)
- **Response**:
  ```json
  {
    "address": "0x123...",
    "balances": [
      {
        "token": "ETH",
        "balance": "1.234567",
        "formattedBalance": "1.2345",
        "chain": "ethereum"
      }
    ]
  }
  ```

## Design

- Each UI part is a separate component
- Good error handling throughout
- Mobile first design
- Smart caching for speed
- Strong typing across the app

## Deployment

- Frontend: Vercel
- Backend: Any Node.js host works

Set the right environment variables when you deploy. 