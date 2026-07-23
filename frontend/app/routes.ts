import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/Home/index.tsx"),
  route("checkout/:productId", "pages/Checkout/index.tsx"),
  route("*", "pages/NotFound/index.tsx"),
] satisfies RouteConfig;
