import type { Order } from "~/@types/order";
import type { Product } from "~/@types/product";

const API_BASE_URL = "http://localhost:3000";

async function parseErrorMessage(response: Response, fallback: string) {
  const data = await response.json().catch(() => null);
  return data?.error ?? fallback;
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`);
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, "Não foi possível buscar os produtos"));
  }
  return response.json();
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, "Não foi possível buscar o produto"));
  }
  return response.json();
}

export async function createCheckout(productId: number, quantity: number): Promise<Order> {
  const response = await fetch(`${API_BASE_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, "Não foi possível concluir o pedido"));
  }
  return response.json();
}
