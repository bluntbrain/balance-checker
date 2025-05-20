"use client";

import AddressForm from "../components/AddressForm";
import BalanceResults from "../components/BalanceResults";
import { useBalance } from "../hooks/useBalance";
import { useState } from "react";

export default function Home() {
  const { loading, error, data, fetchBalance } = useBalance();
  const [showIntro, setShowIntro] = useState(true);

  const handleSubmit = (address: string) => {
    fetchBalance(address);
    setShowIntro(false);
  };

  return (
    <main className="min-h-screen">
      <div className="relative z-10">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"></div>
          <div className="absolute top-60 -left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
        </div>

        {/* Header & Navigation */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
              <span className="text-xl font-bold text-white font-space-grotesk">
                Balance<span className="text-indigo-400">Checker</span>
              </span>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-10">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space-grotesk bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent mb-5">
              Multi-Chain Balance Checker
            </h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Instantly view your token balances across Ethereum, Polygon,
              Arbitrum, Base, and BNB Chain.
            </p>
          </div>

          <AddressForm onSubmit={handleSubmit} isLoading={loading} />

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl mt-6 max-w-md mx-auto animate-fade-in">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-red-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <p>{error}</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex justify-center mt-12 animate-fade-in">
              <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-400 border-t-transparent"></div>
                <p className="mt-4 text-indigo-300 font-medium">
                  Fetching balances across chains...
                </p>
              </div>
            </div>
          )}

          {/* Intro section to show before any results */}
          {showIntro && !loading && !data && !error && (
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
                <h3 className="text-lg font-bold text-white mb-2">
                  Secure & Private
                </h3>
                <p className="text-gray-400 text-sm">
                  All blockchain data is fetched directly from the chain. No
                  private keys required.
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
                  View balances across all major chains simultaneously in one
                  dashboard.
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
                <h3 className="text-lg font-bold text-white mb-2">
                  Real-Time Data
                </h3>
                <p className="text-gray-400 text-sm">
                  Get up-to-date token balances with automatic formatting and
                  token detection.
                </p>
              </div>
            </div>
          )}

          {data && !loading && <BalanceResults data={data} />}
        </div>

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <div className="container mx-auto px-4">
            <p>
              © {new Date().getFullYear()} Balance Checker. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
