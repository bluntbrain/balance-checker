import { useState, FormEvent } from "react";
import { isValidEthereumAddress } from "../utils/validation";

interface AddressFormProps {
  onSubmit: (address: string) => void;
  isLoading: boolean;
}

export default function AddressForm({ onSubmit, isLoading }: AddressFormProps) {
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // handle input change with auto-submission
  const handleInputChange = (value: string) => {
    setAddress(value);

    // clear previous error if input is being changed
    if (error) setError(null);

    // auto-submit if input is a valid ethereum address
    if (isValidEthereumAddress(value)) {
      onSubmit(value);
    }
  };

  // handle paste button click
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleInputChange(text);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
      setError("Failed to access clipboard. Please paste manually.");
    }
  };

  // handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // validate address
    if (!address.trim()) {
      setError("Address is required");
      return;
    }

    if (!isValidEthereumAddress(address)) {
      setError("Invalid Ethereum address");
      return;
    }

    setError(null);
    onSubmit(address);
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-fade-in">
      <form
        onSubmit={handleSubmit}
        className="glass-card rounded-xl p-5 sm:p-6 border border-gray-700/30 shadow-lg"
      >
        <div className="mb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
            <label
              className="block text-gray-300 text-sm font-medium mb-1 sm:mb-0"
              htmlFor="address"
            >
              Enter Ethereum Address
            </label>
            <div className="text-xs text-gray-500 hidden sm:block">
              Supports all EVM-compatible chains
            </div>
          </div>
          <div className="relative">
            <input
              className={`input-field pl-10 pr-20 py-3 ${
                error ? "border-red-500 focus:border-red-500" : ""
              }`}
              id="address"
              type="text"
              placeholder="0x..."
              value={address}
              onChange={(e) => handleInputChange(e.target.value)}
              disabled={isLoading}
              autoComplete="off"
              spellCheck="false"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                type="button"
                className="flex items-center mr-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors text-sm"
                onClick={handlePaste}
                disabled={isLoading}
                title="Paste from clipboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                <span className="hidden sm:inline">Paste</span>
              </button>
            </div>
          </div>
          {error && (
            <div className="flex items-center mt-2 text-red-400 text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
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
              {error}
            </div>
          )}
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-400 text-xs sm:text-sm">
              Enter a valid Ethereum address or use the paste button
            </p>
            <div className="text-xs text-gray-500 mt-1 sm:mt-0 sm:hidden">
              Supports all EVM-compatible chains
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
