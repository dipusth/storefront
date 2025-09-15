import { notFound } from "next/navigation";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import ProductDetail from "@/components/ProductDetail";

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
