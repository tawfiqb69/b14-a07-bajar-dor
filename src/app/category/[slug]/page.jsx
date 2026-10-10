import CategoryProducts from "@/components/category/CategoryProducts";
import Link from "next/link";

// export const instant = false;

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const res = await fetch(
    // `https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`,

    // Alternative API 
    `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`,
    {
      cache: "no-store",
    },
  );

  const products = await res.json();

  if (!products.length) {
  return (
    <section className="py-20 text-center">
      <div className="mx-auto max-w-md rounded-3xl border border-gray-200 bg-white p-8">
        <div className="text-5xl">🛒</div>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          কোনো পণ্য পাওয়া যায়নি
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য পাওয়া যাচ্ছে না।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </section>
  );
}

  const category = products[0];

  return (
    <section>
      {/* Category Header */}
      <div className="flex min-w-0 items-center gap-1 bg-white my-5 rounded-xl py-3 px-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl  text-2xl">
          {category.categoryIcon}
        </div>

        <div className="min-w-0">
          <h1 className="truncate font-semibold text-gray-900">
            {category.categoryNameBn}
          </h1>

          <p className="text-sm text-gray-500">
            {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Products + Sort */}
      <CategoryProducts products={products} />
    </section>
  );
}
