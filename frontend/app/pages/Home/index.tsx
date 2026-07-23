
import { useEffect, useState } from "react";
import type { Product } from "~/@types/product";
import type { Route } from "./+types";

import { Products } from "~/components/Products";
import { Spinner } from "~/components/Spinner";
import { getProducts } from "~/services/api";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "CaseCellShop" },
    { name: "description", content: "Welcome to CaseCellShop!" },
  ];
}

export default function Home() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <Spinner />
      </main>
    );
  }

  return <Products products={products} />

}
