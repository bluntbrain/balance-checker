import { ethers } from 'ethers';
import { RPC_URLS, TOKEN_ADDRESSES, ERC20_ABI, CACHE_TIME } from '../constants';
import { BalanceResponse, CacheStorage, ChainType, TokenBalance } from '../types';

// in-memory cache
const balanceCache: CacheStorage = {};

// provider objects, reuse them to avoid recreating for each request
const providers: Record<ChainType, ethers.providers.JsonRpcProvider | null> = {
  ethereum: null,
  polygon: null,
  arbitrum: null,
  base: null,
  bnb: null
};

// initialize providers once
const getProvider = (chain: ChainType): ethers.providers.JsonRpcProvider => {
  if (!providers[chain]) {
    const apiKey = process.env.ALCHEMY_API_KEY;
    if (!apiKey) {
      throw new Error('ALCHEMY_API_KEY is not set');
    }
    providers[chain] = new ethers.providers.JsonRpcProvider(`${RPC_URLS[chain]}${apiKey}`);
  }
  return providers[chain] as ethers.providers.JsonRpcProvider;
};

// check if address is valid ethereum address
export const isValidAddress = (address: string): boolean => {
  return ethers.utils.isAddress(address);
};

// format balance for display
export const formatBalance = (balance: string): string => {
  const num = parseFloat(balance);
  
  if (num >= 1000) {
    // For large numbers: use commas and show 4 decimal places (no rounding)
    return num.toLocaleString('en-US', { maximumFractionDigits: 4 });
  } else if (num >= 0.01) {
    // For medium numbers: show 5 decimal places (no rounding)
    const numStr = num.toString();
    const decimalIndex = numStr.indexOf('.');
    if (decimalIndex === -1) return numStr;
    return numStr.slice(0, Math.min(decimalIndex + 6, numStr.length));
  } else if (num > 0) {
    // For small numbers: show 8 decimal places (no rounding)
    const numStr = num.toString();
    const decimalIndex = numStr.indexOf('.');
    if (decimalIndex === -1) return numStr;
    return numStr.slice(0, Math.min(decimalIndex + 9, numStr.length));
  } else {
    return '0';
  }
};

// get native token (ETH) balance
const getNativeBalance = async (
  provider: ethers.providers.JsonRpcProvider,
  address: string,
  chain: ChainType
): Promise<TokenBalance | null> => {
  try {
    const balance = await provider.getBalance(address);
    const formattedBalance = ethers.utils.formatEther(balance);
    
    return {
      token: 'ETH',
      balance: formattedBalance,
      formattedBalance: formatBalance(formattedBalance),
      chain
    };
  } catch (error) {
    console.error(`Error fetching ${chain} ETH balance:`, error);
    return null;
  }
};

// get erc20 token balance
const getTokenBalance = async (
  provider: ethers.providers.JsonRpcProvider,
  address: string,
  tokenAddress: string,
  tokenSymbol: 'USDC' | 'LINK',
  chain: ChainType
): Promise<TokenBalance | null> => {
  try {
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const balance = await tokenContract.balanceOf(address);
    
    // USDC is 6 decimals, LINK is 18
    const decimals = tokenSymbol === 'USDC' ? 6 : 18;
    const formattedBalance = ethers.utils.formatUnits(balance, decimals);
    
    return {
      token: tokenSymbol,
      balance: formattedBalance,
      formattedBalance: formatBalance(formattedBalance),
      chain
    };
  } catch (error) {
    console.error(`Error fetching ${chain} ${tokenSymbol} balance:`, error);
    return null;
  }
};

// get all balances for an address across all chains
export const getBalances = async (address: string): Promise<BalanceResponse> => {
  // check cache first
  const now = Date.now();
  const cacheEntry = balanceCache[address];
  
  if (cacheEntry && (now - cacheEntry.timestamp) / 1000 < CACHE_TIME) {
    console.log(`Using cached balance for ${address}`);
    return cacheEntry.data;
  }
  
  const allBalances: TokenBalance[] = [];
  const chains = Object.keys(RPC_URLS) as ChainType[];
  
  // fetch balances from all chains concurrently
  const promises = chains.flatMap(chain => {
    try {
      const provider = getProvider(chain);
      
      // get native token balance
      const nativePromise = getNativeBalance(provider, address, chain);
      
      // get token balances
      const tokenPromises = Object.entries(TOKEN_ADDRESSES[chain]).map(([tokenSymbol, tokenAddress]) => {
        return getTokenBalance(
          provider, 
          address, 
          tokenAddress, 
          tokenSymbol as 'USDC' | 'LINK', 
          chain
        );
      });
      
      return [nativePromise, ...tokenPromises];
    } catch (error) {
      console.error(`Error setting up provider for ${chain}:`, error);
      return [];
    }
  });
  
  // resolve all promises
  const results = await Promise.allSettled(promises);
  
  // filter out rejected results and null values
  const validBalances = results
    .filter((result): result is PromiseFulfilledResult<TokenBalance | null> => 
      result.status === 'fulfilled' && result.value !== null)
    .map(result => result.value) as TokenBalance[];
  
  // prepare response
  const response: BalanceResponse = {
    address,
    balances: validBalances
  };
  
  // cache the result
  balanceCache[address] = {
    timestamp: now,
    data: response
  };
  
  return response;
}; 