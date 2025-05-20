"use client";

import { AddressForm } from "../components/AddressForm";
import { BackgroundGradients } from "../components/BackgroundGradients";
import { BalanceResults } from "../components/BalanceResults";
import { ErrorMessage } from "../components/ErrorMessage";
import { FeatureCards } from "../components/FeatureCards";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HeroTitle } from "../components/HeroTitle";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useBalance } from "../hooks/useBalance";
import { useState, useCallback } from "react";

export default function Home() {
  const { loading, error, data, fetchBalance } = useBalance();
  const [showIntro, setShowIntro] = useState(true);

  // memoize the submit handler
  const handleSubmit = useCallback(
    (address: string) => {
      fetchBalance(address);
      setShowIntro(false);
    },
    [fetchBalance]
  );

  return (
    <main className="min-h-screen">
      <div className="relative z-10">
        {/* Background elements */}
        <BackgroundGradients />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-4 md:py-10">
          <HeroTitle
            title="Multi-Chain Balance Checker"
            subtitle="Instantly view your token balances across Ethereum, Polygon, Arbitrum, Base, and BNB Chain."
          />

          <AddressForm onSubmit={handleSubmit} isLoading={loading} />

          {error && <ErrorMessage message={error} />}

          {loading && <LoadingSpinner />}

          {/* Intro section  */}
          {showIntro && !loading && !data && !error && <FeatureCards />}

          {data && !loading && <BalanceResults data={data} />}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
