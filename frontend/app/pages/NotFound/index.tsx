import { Link } from "react-router";
import type { Route } from "./+types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Página não encontrada - CaseCellShop" },
    { name: "description", content: "Página não encontrada." },
  ];
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 text-center">
      <p className="text-sm font-semibold text-gray-500">404</p>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Página não encontrada
      </h1>
      <p className="max-w-md text-gray-600">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
      >
        Voltar para a loja
      </Link>
    </main>
  );
}
