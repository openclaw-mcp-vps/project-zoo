import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-slate-400">404</p>
      <h1 className="mt-3 text-3xl font-semibold text-slate-100">Page not found</h1>
      <p className="mt-2 text-slate-300">
        This route does not exist in project-zoo.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-teal-400"
      >
        Return to homepage
      </Link>
    </main>
  );
}
