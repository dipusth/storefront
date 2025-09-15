"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { CardProduct } from "../Styles";
import { ProductType } from "@/types/PostType";

// Updated interface to match FakeStoreAPI structure

interface Props {
  product?: ProductType;
  cardHeight?: string;
}

export const ProductCard = ({ product, cardHeight }: Props) => {
  const { cart, setCart } = useCart();

  const addToCart = () => {
    const newCart = [...cart];
    if (product) {
      newCart.push(product);
      setCart(newCart);
    }
  };

  return (
    <Card className="py-0 border-0 shadow-none rounded-lg gap-0 group">
      <Link href={`/products/${product?.id}`} className="block">
        {product?.image && (
          <CardProduct
            className={`${cardHeight} card-product w-full relative border border-slate-200 overflow-hidden rounded-sm bg-slate-100 group-hover:shadow-md transition-shadow`}
          >
            <Image
              className="opacity-90 object-contain group-hover:opacity-100 transition-opacity p-4"
              src={product.image}
              alt={product.title || "Product image"}
              title={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </CardProduct>
        )}
        <CardHeader className="py-3 text-left px-0">
          <CardTitle className="justify-between flex items-start gap-2">
            <span className="text-sm font-medium line-clamp-2 flex-1">
              {product?.title}
            </span>
            <span className="font-semibold text-nowrap">${product?.price}</span>
          </CardTitle>
          {/* Optional: Add rating display */}
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-yellow-500">★</span>
          </div>
        </CardHeader>
      </Link>
      <CardFooter className="px-0">
        <Button
          type="button"
          variant={"outline"}
          className="p-2 border text-gray-500 rounded-3xl mb-3 cursor-pointer flex items-center gap-2 w-full justify-center hover:bg-gray-50 transition-colors"
          onClick={addToCart}
        >
          <ShoppingCart size={16} />
          <span>Add to Cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
