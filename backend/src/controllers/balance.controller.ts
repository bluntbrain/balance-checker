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
    
    // Check if we got any balances
    if (!balances.balances.length) {
      res.status(404).json({ 
        error: 'No balances found',
        address,
        balances: []
      });
      return;
    }
    
    res.status(200).json(balances);
  } catch (error) {
    console.error('Error in getBalance controller:', error);
    
    // Provide more detailed error message
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unknown error occurred';
      
    const statusCode = errorMessage.includes('ALCHEMY_API_KEY') 
      ? 500 
      : errorMessage.includes('could not retrieve') 
        ? 504 
        : 500;
        
    res.status(statusCode).json({ 
      error: errorMessage,
      details: error instanceof Error && error.stack ? error.stack.split('\n')[0] : undefined
    });
  }
}; 