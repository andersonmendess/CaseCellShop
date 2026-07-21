
import { Suspense, useEffect, useState } from "react";
import type { Product } from "~/@types/product";
import type { Route } from "./+types";

import { Products } from "~/components/Products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CaseCellShop" },
    { name: "description", content: "Welcome to CaseCellShop!" },
  ];
}

export default function Home() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return <Products products={products} />

}
