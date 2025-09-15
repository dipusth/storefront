"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import React from "react";
import CartWrapper from "./Style";
import ProductDetail from "@/components/ProductDetail";
import { ProductType } from "@/types/PostType";

const Cart = () => {
  const { cart } = useCart();

  // Calculate prices dynamically
  const subtotal = cart.reduce((total, item) => total + (item.price || 0), 0);
  const totalItems = cart.length;
  const total = subtotal;

  return (
    <div className="container">
      <div className="flex gap-8 my-10">
        {/* Cart Items */}
        <div className="p-5 border rounded-lg flex-2">
          <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

          {cart.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <CartWrapper
                  className="p-5 border-b"
                  key={`${item.id}-${index}`}
                >
                  <ProductDetail product={item} cardHeight="h-50" />
                </CartWrapper>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="flex-1 border rounded-lg max-h-[300px] sticky top-4">
          <h3 className="border-b p-5 font-semibold text-lg">Price Details</h3>
          <div className="p-5">
            <div className="flex justify-between mb-3">
              <span>
                Price ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {cart.length > 0 && (
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition-colors">
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
