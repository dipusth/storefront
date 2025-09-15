"use client";
import { ProductType } from "@/types/PostType";
import { createContext, useContext, useState, type ReactNode } from "react";

type CartContextType = {
  cart: ProductType[];
  setCart: (cart: ProductType[]) => void;
};
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<ProductType[]>([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
