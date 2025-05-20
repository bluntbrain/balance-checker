import React from "react";

export const FeatureCards = () => {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      <div className="glass-card p-6 rounded-xl text-center">
        <div className="rounded-full bg-blue-500/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Secure & Private</h3>
        <p className="text-gray-400 text-sm">
          All blockchain data is fetched directly from the chain. No private
          keys required.
        </p>
      </div>

      <div className="glass-card p-6 rounded-xl text-center">
        <div className="rounded-full bg-purple-500/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-purple-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">
          Multi-Chain Support
        </h3>
        <p className="text-gray-400 text-sm">
          View balances across all major chains simultaneously in one dashboard.
        </p>
      </div>

      <div className="glass-card p-6 rounded-xl text-center">
        <div className="rounded-full bg-indigo-500/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-indigo-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Real-Time Data</h3>
        <p className="text-gray-400 text-sm">
          Get up-to-date token balances with automatic formatting and token
          detection.
        </p>
      </div>
    </div>
  );
};
