import { Request, Response } from 'express';
import { isValidAddress, getBalances } from '../services/balance.service';

// get balance for an ethereum address
export const getBalance = async (req: Request, res: Response): Promise<void> => {
  try {
    const address = req.query.address as string;
    
    // check if address parameter exists
    if (!address) {
      res.status(400).json({ error: 'Address parameter is required' });
      return;
    }
    
    // check if address is valid
    if (!isValidAddress(address)) {
      res.status(400).json({ error: 'Invalid Ethereum address' });
      return;
    }
    
    // get balances for address
    const balances = await getBalances(address);
    
    res.status(200).json(balances);
  } catch (error) {
    console.error('Error in getBalance controller:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    });
  }
}; 