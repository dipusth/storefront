import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};