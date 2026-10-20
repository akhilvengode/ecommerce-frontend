import Link from "next/link";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Everyday Store
          </Link>

          <nav className="flex items-center gap-6 text-sm">
            <Link href="/products" className="text-zinc-600 hover:text-black">
              Products
            </Link>
            <Link href="/cart" className="text-zinc-600 hover:text-black">
              Cart
            </Link>
            <Link href="/login" className="text-zinc-600 hover:text-black">
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-zinc-500">
          © {new Date().getFullYear()} Everyday Store
        </div>
      </footer>
    </>
  );
}
