"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

// Fetch product data
async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const product = await getProduct(id);

    return (
      <div className="container mx-auto px-4 py-8">
        <ProductDetail product={product} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}

function ProductDetail({ product }: { product: any }) {
  const { cart, setCart } = useCart();

  const addToCart = () => {
    const newCart = [...cart];
    if (!newCart.find((item) => item.id === product.id)) {
      newCart.push(product);
    }
    setCart(newCart);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      {/* Product Image */}
      <div className="bg-white rounded-lg p-8">
        <div className="relative aspect-square w-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-lg text-gray-500 mt-2">{product.category}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.round(product.rating.rate))}
            {"☆".repeat(5 - Math.round(product.rating.rate))}
          </div>
          <span className="text-gray-600">
            {product.rating.rate} ({product.rating.count} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="text-3xl font-bold text-gray-900">${product.price}</div>

        {/* Description */}
        <div className="prose prose-gray">
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={addToCart}
          className="w-full md:w-auto px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
