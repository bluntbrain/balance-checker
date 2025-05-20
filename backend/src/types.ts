// supported blockchain networks
export type ChainType = 'ethereum' | 'polygon' | 'arbitrum' | 'base' | 'bnb';

// token types
export type TokenType = 'ETH' | 'USDC' | 'LINK';

// balance response format
export interface TokenBalance {
  token: TokenType;
  balance: string;
  formattedBalance: string;
  chain: ChainType;
}

// final response format
export interface BalanceResponse {
  address: string;
  balances: TokenBalance[];
  hasNonZeroBalances?: boolean;
}

// cache item structure
export interface CacheItem {
  timestamp: number;
  data: BalanceResponse;
}

// cache storage structure
export interface CacheStorage {
  [address: string]: CacheItem;
} 