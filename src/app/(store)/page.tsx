import Link from "next/link";

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-500">
        Simple shopping, made easy
      </p>

      <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
        Find something you'll love.
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600">
        Explore our collection of everyday essentials, thoughtfully selected
        for you.
      </p>

      <Link
        href="/products"
        className="mt-8 inline-flex rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
      >
        Explore products
      </Link>
    </section>
  );
}
