import Link from "next/link";
import {
  formatPrice,
  formatPercent,
  getUnitLabel,
  getUnitShort,
  getPriceSummary,
  getMarketAvg,
  getPriceDiff,
  getChangeStyle,
  formatAvgPrice,
} from "@/lib/utils";

export const instant = false;

export default async function ProductDetails({ params }) {
  const { slug } = await params;

  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { cache: "no-store" },
  );
  const products = await res.json();

  const product = products.find((item) => item.slug === slug);

  // Product na pele (tomar ager code-i thakche)
  if (!product) {
    return (
      <section className="py-20 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-gray-200 bg-[#fbfcfb] p-8">
          <div className="text-5xl">🛒</div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            পণ্য পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনি যে পণ্যটি খুঁজছেন সেটি পাওয়া যায়নি।
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </section>
    );
  }

  const summary = getPriceSummary(product.markets);
  const style = getChangeStyle(product.change.dir);
  const diff = getPriceDiff(product);

  // "বেড়েছে" / "কমেছে" / "অপরিবর্তিত"
  const dirText =
    product.change.dir === "up"
      ? "বেড়েছে"
      : product.change.dir === "down"
        ? "কমেছে"
        : "অপরিবর্তিত";

  return (
    <section className="space-y-6">
      {/* Breadcrumb: হোম > চাল > বাটাম সাইজ চাল */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-900">{product.nameBn}</span>
      </nav>

      {/* Top card: product info + আজকের দাম */}
      <div className="rounded-3xl border border-gray-200 bg-[#fbfcfb] p-5 sm:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-4xl sm:h-24 sm:w-24 sm:text-5xl">
              {product.image}
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {getUnitLabel(product.unit)} · {product.categoryNameBn}
              </p>

              <p className="mt-2 text-sm text-gray-700">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-bold">{dirText}</span>
                {product.change.dir !== "flat" && (
                  <> · {formatPrice(diff)} টাকা</>
                )}
              </p>
            </div>
          </div>

          {/* Right: আজকের দাম box */}
          <div className="rounded-2xl bg-gray-100 px-8 py-5 text-center md:min-w-48">
            <p className="text-sm text-gray-500">আজকের দাম</p>
            <p className="mt-1 text-4xl font-bold text-gray-900">
              {formatPrice(product.today)}
            </p>
            <p className="text-sm text-gray-500">
              টাকা / {getUnitShort(product.unit)}
            </p>
            <p className={`mt-1 text-sm font-semibold ${style.color}`}>
              {style.arrow} {formatPercent(product.change.pct)}
            </p>
          </div>
        </div>
      </div>

      {/* দামের সারসংক্ষেপ */}
      <div className="rounded-3xl border border-gray-200 bg-[#fbfcfb] p-5 sm:p-6">
        <h2 className="text-xl font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {/* সর্বনিম্ন */}
          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-gray-600">সর্বনিম্ন দাম</p>
            <p className="mt-2 text-2xl font-bold text-green-700">
              {formatPrice(summary.min)}{" "}
              <span className="text-base font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-sm text-gray-600">সবচেয়ে কম দামের বাজার</p>
          </div>

          {/* সর্বাধিক */}
          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-gray-600">সর্বাধিক দাম</p>
            <p className="mt-2 text-2xl font-bold text-red-600">
              {formatPrice(summary.max)}{" "}
              <span className="text-base font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-sm text-gray-600">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          {/* গড় */}
          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-gray-600">গড় দাম</p>
            <p className="mt-2 text-2xl font-bold text-green-700">
              {formatPrice(summary.avg)}{" "}
              <span className="text-base font-medium">টাকা</span>
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {getUnitLabel(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম (table) */}
      <div className="rounded-3xl border border-gray-200 bg-[#fbfcfb] p-5 sm:p-6">
        <h2 className="text-xl font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-160 text-sm sm:text-base">
            <thead>
              <tr className="text-gray-500">
                <th className="px-5 py-4 text-left font-semibold">বাজার</th>
                <th className="px-5 py-4 text-left font-semibold">বিভাগ</th>
                <th className="px-5 py-4 text-right font-semibold">
                  সর্বনিম্ন
                </th>
                <th className="px-5 py-4 text-right font-semibold">সর্বাধিক</th>
                <th className="px-5 py-4 text-right font-semibold">গড়</th>
              </tr>
            </thead>

            <tbody>
              {product.markets.map((market, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-300 even:bg-[#f2f5f1]"
                >
                  <td className="px-5 py-4 text-gray-900">{market.market}</td>
                  <td className="px-5 py-4 text-gray-700">{market.division}</td>
                  <td className="px-5 py-4 text-right text-gray-700">
                    {formatPrice(market.min)} টাকা
                  </td>
                  <td className="px-5 py-4 text-right text-gray-700">
                    {formatPrice(market.max)} টাকা
                  </td>
                  <td className="px-5 py-4 text-right font-bold text-gray-900">
                    {formatAvgPrice(getMarketAvg(market))} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
