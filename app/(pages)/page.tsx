import Image from "next/image";
import { Outfit } from "next/font/google";
import "./page.css";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProductCard } from "@/components/ProductCard/ProductCard";
import { Carousel } from "@/components/Carousel";
import { fetchApi } from "@/hooks/useFetchApi";
import { ProductType } from "@/types/PostType";

const OutfitFont = Outfit({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

export default async function Home() {
  let products: ProductType[] = [];
  let error: string | null = null;
  const productApi = "https://fakestoreapi.com/products";

  try {
    const response = await fetchApi(`${productApi}?limit=5`, {});
    if (!response.ok) {
      throw new Error(await response.text());
    }
    products = await response.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = "Unknown server error";
    }
  }
  console.log("products", products);

  return (
    <div className={`${OutfitFont.className}`}>
      {/* View Products */}
      <section className="mt-10">
        <div className="container">
          <div className="flex justify-between">
            <h3>Flash Sale</h3>
            <Link href="/products" className="flex items-center">
              <ArrowRight size={18} className="mr-1 hover:mr-3" />
              View All
            </Link>
          </div>
          <div className="cards flex flex-wrap justify-between mt-5 gap-5">
            {products.map((item, i) => {
              console.log("map item", item.image);
              return (
                <div
                  className="lg:w-[18%] md:w-[25%] w-full gap-3 border rounded-sm p-5"
                  key={i}
                >
                  <ProductCard product={item} cardHeight="h-50" />

                  {/* <span>{item?.default_price}</span> */}
                  {/* <p>{item.name}</p> */}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
