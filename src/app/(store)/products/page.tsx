
import type { Product } from "@/types/product";

async function getProducts(): Promise<Product[]> {
  const apiUrl = process.env.BACKEND_API_URL;

  if (!apiUrl) {
    throw new Error("BACKEND_API_URL is not configured");
  }

  const response = await fetch(`${apiUrl}/api/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  return response.json();
}

export default async function ProductsPage() {
  let products: Product[];

  try {
    products = await getProducts();
  } catch {
    return (
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="mt-4 text-zinc-600">
          We couldn't load the products. Please try again later.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">All Products</h1>

      {products.length === 0 ? (
        <p className="mt-6 text-zinc-600">
          No products available yet.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-xl border border-zinc-200 p-5"
            >
              <h2 className="font-semibold">{product.name}</h2>

              {product.description && (
                <p className="mt-2 text-sm text-zinc-600">
                  {product.description}
                </p>
              )}

              <p className="mt-4 text-lg font-semibold">
                ₹{Number(product.price).toFixed(2)}
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                {product.stock > 0 ? "In stock" : "Out of stock"}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
