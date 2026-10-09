
import Link from "next/link";
import {
  formatPrice,
  formatPercent,
  getUnitLabel,
} from "@/lib/utils";

function PriceCard({ product, type }) {
  const isRiser = type === "riser";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex flex-col gap-4">
        {/* Product Info */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-base-300 text-2xl">
            {product.image}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-gray-900">
              {product.nameBn}
            </p>

            <p className="text-sm text-gray-500">
              {getUnitLabel(product.unit)}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500">
              আজকের দাম
            </p>

            <p className="font-semibold text-gray-900">
              {formatPrice(product.today)} টাকা
            </p>
          </div>

          {/* Price Change */}
          <p
            className={`rounded-xl p-1 text-sm font-semibold ${
              isRiser
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {isRiser ? "▲" : "▼"}{" "}
            {formatPercent(product.change.pct)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function PriceMovers({ risers, fallers }) {
  return (
    <section className="mt-8">
      {/* দাম বেড়েছে */}
      <div>
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900">
            <span className="text-red-600">▲</span>{" "}
            আজ দাম বেড়েছে
          </h3>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {risers.map((product) => (
            <PriceCard
              key={product.id}
              product={product}
              type="riser"
            />
          ))}
        </div>
      </div>

      {/* দাম কমেছে */}
      <div className="mt-10">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900">
            <span className="text-green-600">▼</span>{" "}
            আজ দাম কমেছে
          </h3>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {fallers.map((product) => (
            <PriceCard
              key={product.id}
              product={product}
              type="faller"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

