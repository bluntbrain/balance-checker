import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({
  message = "Fetching balances across chains...",
}: LoadingSpinnerProps) => {
  return (
    <div className="flex justify-center mt-12 animate-fade-in">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-400 border-t-transparent"></div>
        <p className="mt-4 text-indigo-300 font-medium">{message}</p>
      </div>
    </div>
  );
};
