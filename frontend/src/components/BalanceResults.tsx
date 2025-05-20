import { BalanceResponse, ChainType } from "../utils/types";
import ChainLogo from "./ChainLogo";
import TokenLogo from "./TokenLogo";

interface BalanceResultsProps {
  data: BalanceResponse;
}

// chain name mapping
const chainNames = {
  ethereum: "Ethereum",
  polygon: "Polygon",
  arbitrum: "Arbitrum",
  base: "Base",
  bnb: "BNB Chain",
};

export default function BalanceResults({ data }: BalanceResultsProps) {
  // filter out zero balances
  const filteredBalances = data.balances.filter((balance) => {
    const numBalance = parseFloat(balance.balance);
    return numBalance > 0;
  });

  // group non-zero balances by chain
  const balancesByChain = filteredBalances.reduce<
    Record<string, typeof filteredBalances>
  >((acc, balance) => {
    if (!acc[balance.chain]) {
      acc[balance.chain] = [];
    }
    acc[balance.chain].push(balance);
    return acc;
  }, {});

  // Get chains with non-zero balances
  const chainsWithBalances = Object.keys(balancesByChain);

  // Check if we have any non-zero balances
  const hasNonZeroBalances = chainsWithBalances.length > 0;

  // Sort balance by value (highest first)
  Object.keys(balancesByChain).forEach((chain) => {
    balancesByChain[chain].sort((a, b) => {
      return parseFloat(b.balance) - parseFloat(a.balance);
    });
  });

  return (
    <div className="mt-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-bold text-white font-space-grotesk">
          Balance Summary
        </h2>
        <div className="mt-2 sm:mt-0 glass-card px-4 py-2 rounded-full inline-flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2 text-indigo-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <p className="text-sm text-gray-300 font-mono">
            <span className="text-xs text-gray-400 mr-1 hidden sm:inline">
              Address:
            </span>
            <span className="text-ellipsis overflow-hidden">
              {data.address.slice(0, 6)}...{data.address.slice(-4)}
            </span>
          </p>
        </div>
      </div>

      {!hasNonZeroBalances ? (
        <div className="glass-card rounded-xl p-6 text-center mb-8 border border-gray-700/30">
          <div className="rounded-full bg-gray-800/80 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 font-space-grotesk">
            No Balances Found
          </h3>
          <p className="text-gray-400">
            This address has no token balances greater than zero.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
              Try a different address
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
              Check for typos
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
              Verify chain support
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary section */}
          <div className="glass-card rounded-xl p-4 border border-gray-700/30 mb-6">
            <div className="text-sm text-gray-400 mb-2">
              Chains with balances
            </div>
            <div className="flex flex-wrap gap-2">
              {chainsWithBalances.map((chain) => (
                <div
                  key={`summary-${chain}`}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm bg-${chain}-500/10 text-${
                    chain === "bnb" ? "yellow" : chain
                  }-300 border border-${
                    chain === "bnb" ? "yellow" : chain
                  }-500/20`}
                >
                  <ChainLogo chain={chain as ChainType} size="small" />
                  <span className="ml-1.5">
                    {chainNames[chain as keyof typeof chainNames]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Balances by Chain */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(balancesByChain).map(
              ([chain, balances], chainIndex) => (
                <div
                  key={chain}
                  className="glass-card rounded-xl p-4 sm:p-5 border border-gray-700/30"
                  style={{
                    animation: `fadeIn 0.3s ease forwards ${
                      0.1 + chainIndex * 0.1
                    }s`,
                    opacity: 0,
                  }}
                >
                  <div className="flex items-center mb-4">
                    <ChainLogo chain={chain as ChainType} />
                    <h3 className="font-bold ml-2 text-white font-space-grotesk">
                      {chainNames[chain as keyof typeof chainNames]}
                    </h3>
                    <span className={`ml-auto chain-badge chain-${chain}`}>
                      {balances.length} token{balances.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {balances.map((balance, balanceIndex) => (
                      <div
                        key={`${chain}-${balance.token}`}
                        className="token-badge hover:scale-[1.02] transition-all duration-200"
                        style={{
                          animation: `fadeIn 0.2s ease forwards ${
                            0.2 + balanceIndex * 0.05
                          }s`,
                          opacity: 0,
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <TokenLogo token={balance.token} />
                            <div className="ml-2">
                              <div className="font-bold text-white">
                                {balance.token}
                              </div>
                              <div className="text-xs text-gray-400">
                                {parseFloat(balance.balance).toLocaleString(
                                  undefined,
                                  { maximumFractionDigits: 6 }
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right font-mono text-sm text-indigo-300">
                            {balance.formattedBalance}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
