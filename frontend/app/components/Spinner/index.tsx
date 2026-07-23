export function Spinner() {
  return (
    <div
      role="status"
      aria-label="Carregando"
      className={`h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900 `}
    />
  );
}
