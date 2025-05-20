// blockchain rpc urls
export const RPC_URLS = {
  ethereum: 'https://eth-mainnet.g.alchemy.com/v2/',
  polygon: 'https://polygon-mainnet.g.alchemy.com/v2/',
  arbitrum: 'https://arb-mainnet.g.alchemy.com/v2/',
  base: 'https://base-mainnet.g.alchemy.com/v2/',
  bnb: 'https://bnb-mainnet.g.alchemy.com/v2/'
};

// token addresses for different chains
export const TOKEN_ADDRESSES = {
  ethereum: {
    USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  },
  polygon: {
    USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    LINK: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
  },
  arbitrum: {
    USDC: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    LINK: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
  },
  base: {
    USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    LINK: '0x88Fb150BDc53A65fe94Dea0c9BA0a6dAf8C6e196',
  },
  bnb: {
    USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
    LINK: '0x404460C6A5EdE2D891e8297795264fDe62ADBB75',
  }
};

// abi for erc20 token
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function'
  }
];

// cache time in seconds
export const CACHE_TIME = 60; 