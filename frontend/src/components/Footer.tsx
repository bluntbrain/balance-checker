import React from "react";

export const Footer = () => {
  return (
    <footer className="mt-16 py-8 border-t border-gray-800 text-center text-sm text-gray-500">
      <div className="container mx-auto px-4">
        <p>
          © {new Date().getFullYear()} Balance Checker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
