import React from "react";

export const BackgroundGradients = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute top-60 -left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
    </div>
  );
};
