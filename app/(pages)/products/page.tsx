import { ProductList } from "@/components/ProductList";
import { fetchApi } from "@/hooks/useFetchApi";
import { stripe } from "@/lib/stripe";
import { ProductType } from "@/types/PostType";

export default async function ProductsPage() {
  let products: ProductType[] = [];
  let error: string | null = null;
  const productApi = "https://fakestoreapi.com/products";

  try {
    const response = await fetchApi(`${productApi}`, {});
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
    <div className="container text-center pt-10">
      <h1 className="font-bold text-2xl pb-5">All Products</h1>
      <ProductList products={products} />
    </div>
  );
}
