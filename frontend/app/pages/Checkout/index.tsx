import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Product } from "~/@types/product";
import type { Order } from "~/@types/order";
import type { Route } from "./+types";
import { Spinner } from "~/components/Spinner";
import { createCheckout, getProduct } from "~/services/api";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Checkout - CaseCellShop" },
    { name: "description", content: "Finalize sua compra na CaseCellShop." },
  ];
}

export default function Checkout() {
  const { productId } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState<Order | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const data = await getProduct(productId);
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <Spinner />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
        <p className="text-lg text-gray-700">Produto não encontrado.</p>
        <Link
          to="/"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Voltar para a loja
        </Link>
      </main>
    );
  }

  const total = product.price * quantity;

  const handleConfirm = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const data = await createCheckout(product.id, quantity);
      setOrder(data);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Não foi possível concluir o pedido"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (order) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4 py-16 text-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Pedido confirmado!
          </h1>
          <p className="mt-1 text-gray-600">
            Obrigado por comprar na CaseCellShop.
          </p>
        </div>

        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <span className="text-sm text-gray-500">Pedido</span>
            <span className="font-mono text-sm font-medium text-gray-900">
              #{order.id}
            </span>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Produto</span>
              <span className="text-sm font-medium text-gray-900">
                {product.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Quantidade</span>
              <span className="text-sm font-medium text-gray-900">
                {order.quantity}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 capitalize">
                {order.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Data</span>
              <span className="text-sm font-medium text-gray-900">
                {new Date(order.created_at).toLocaleString("pt-BR")}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-3">
              <span className="font-medium text-gray-900">Total</span>
              <span className="text-lg font-bold text-gray-900">
                {order.total_price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Voltar para a loja
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-16 sm:px-6">
        <div>
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; Voltar para a loja
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            Finalizar compra
          </h1>
        </div>

        <div className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row">
          <div className="aspect-square w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-40">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-900">
              {product.name}
            </h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-lg font-bold text-gray-900">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>

            <label className="mt-2 flex items-center gap-2 text-sm text-gray-700">
              Quantidade
              <input
                type="number"
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.min(
                      product.stock,
                      Math.max(1, Number(e.target.value) || 1)
                    )
                  )
                }
                className="w-20 rounded-md border border-gray-300 px-2 py-1 text-center"
              />
            </label>
            <p className="text-xs text-gray-500">
              {product.stock} unidades em estoque
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between text-gray-700">
            <span>Subtotal</span>
            <span>
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          {submitError && (
            <p className="text-sm text-red-500">{submitError}</p>
          )}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={submitting}
            className="mt-2 rounded-lg bg-gray-900 px-4 py-3 text-center font-medium text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Confirmando..." : "Confirmar Pedido"}
          </button>
        </div>
      </div>
    </main>
  );
}
