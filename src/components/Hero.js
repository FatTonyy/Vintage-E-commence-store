import React from "react";

export default function Hero({ children }) {
  return (
    <div className="hero">
      <div className="banner">
        <h1>Vintage Products, </h1>
        <p>Where Technology began!</p>
        {children}
      </div>
    </div>
  );
}
