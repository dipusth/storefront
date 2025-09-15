import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ProductType } from "@/types/PostType";

interface Props {
  product?: ProductType;
  cardHeight?: string;
}

const ProductDetail = ({ product, cardHeight }: Props) => {
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex py-5 gap-6">
      {/* Image Container */}
      <div
        className={`relative rounded-sm overflow-hidden bg-gray-100 ${
          cardHeight || "h-40"
        } w-40 flex-shrink-0`}
      >
        <Image
          src={product.image || "/placeholder-image.jpg"}
          alt={product.title || "Product image"}
          title={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100px, 160px"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-xl mb-2 line-clamp-2">{product.title}</h4>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {product.price && (
          <p className="text-lg font-semibold text-green-600 mb-4">
            ${product.price}
          </p>
        )}

        {/* Quantity Controls */}
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            className="w-10 h-10 p-0 rounded-none border-gray-300 hover:bg-gray-100"
          >
            -
          </Button>
          <span className="mx-4 font-medium min-w-[2rem] text-center">0</span>
          <Button
            variant="outline"
            size="sm"
            className="w-10 h-10 p-0 rounded-none border-gray-300 hover:bg-gray-100"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
