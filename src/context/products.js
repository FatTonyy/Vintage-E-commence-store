// products context
import React from "react";

export const ProductContext = React.createContext();

// Provider, consumer

export default function ProductProvider({ children }) {
  const greeting = "Yo";
  const product = { id: 1, title: "product name" };
  return (
    <ProductContext.Provider value={{ greeting, product }}>
      {children}
    </ProductContext.Provider>
  );
}
