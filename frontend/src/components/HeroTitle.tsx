import React from "react";

interface HeroTitleProps {
  title: string;
  subtitle: string;
}

export const HeroTitle = ({
  title = "Multi-Chain Balance Checker",
  subtitle = "Instantly view your token balances across Ethereum, Polygon, Arbitrum, Base, and BNB Chain.",
}: HeroTitleProps) => {
  return (
    <div className="text-center mb-10 animate-fade-in">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-space-grotesk bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent mb-5">
        {title}
      </h1>
      <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};
