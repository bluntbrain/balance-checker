import { useState } from 'react';
import { BalanceResponse } from '../utils/types';

// api base url
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const useBalance = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BalanceResponse | null>(null);
  
  // fetch balance for an address
  const fetchBalance = async (address: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_URL}/api/balance?address=${address}`);
      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to fetch balance');
      }
      
      setData(responseData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  };
  
  return { loading, error, data, fetchBalance };
}; 