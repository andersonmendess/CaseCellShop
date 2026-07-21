import type { Product } from "~/@types/product";

export function Products({ products }: { products: Product[] }) {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <h1 className="text-4xl font-bold text-center">
              Bem-vindo à CaseCellShop!
            </h1>
            <p className="text-lg text-center text-gray-600">
              Explore nossa coleção de capinhas para celular com designs exclusivos e proteção contra quedas.
            </p>
          </div>
          <div className="w-[500px] max-w-[100vw] p-4">
            <h2 className="text-2xl font-semibold text-center">
              Produtos em Destaque
            </h2>
            <p className="text-md text-center text-gray-600">
              Confira nossos produtos mais populares e encontre a capinha perfeita para o seu celular.
            </p>
          </div>
        </header>
        <div className="flex flex-col items-center gap-16 w-full max-w-[100vw]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-[100vw]">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center gap-4 p-4 border border-gray-300 rounded-lg shadow-md"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-cover rounded-lg"
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-white font-bold">{product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}</p>
                <p className="text-gray-500">Stock: {product.stock}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
