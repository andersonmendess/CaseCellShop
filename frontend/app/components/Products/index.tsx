import { Link } from "react-router";
import type { Product } from "~/@types/product";

export function Products({ products }: { products: Product[] }) {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-4 pt-16 pb-16 sm:px-6">
        <header className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Bem-vindo à CaseCellShop!
          </h1>
          <p className="text-lg text-gray-600">
            Explore nossa coleção de capinhas para celular com designs exclusivos e proteção contra quedas.
          </p>
        </header>

        {products.length === 0 ? (
          <p className="py-16 text-center text-gray-500">
            Nenhum produto disponível no momento.
          </p>
        ) : (
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {product.stock === 0 && (
                    <span className="absolute top-2 right-2 rounded-full bg-gray-900/80 px-2 py-1 text-xs font-medium text-white">
                      Esgotado
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1 p-4">
                  <h3 className="line-clamp-1 font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="line-clamp-2 text-sm text-gray-600">
                    {product.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">
                      {product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                    <p
                      className={
                        product.stock > 0
                          ? "text-xs text-gray-500"
                          : "text-xs font-medium text-red-500"
                      }
                    >
                      {product.stock > 0
                        ? `${product.stock} em estoque`
                        : "Sem estoque"}
                    </p>
                  </div>
                  {product.stock > 0 ? (
                    <Link
                      to={`/checkout/${product.id}`}
                      className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-gray-700"
                    >
                      Comprar
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="mt-3 cursor-not-allowed rounded-lg bg-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-500"
                    >
                      Esgotado
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
