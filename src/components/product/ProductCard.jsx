import Link from "next/link";
import {
  formatPrice,
  formatPercent,
  getUnitLabel,
} from "@/lib/utils";

export default function ProductCard({ product }) {
  const isRiser = product.change.dir === "up";
  const isFaller = product.change.dir === "down";

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

          {/* Change */}
          {product.change.dir === "flat" ? (
            <p className="text-sm font-semibold text-gray-500 bg-green-50 rounded-xl p-1">
              — ০.০%
            </p>
          ) : (
            <p
              className={`text-sm font-semibold ${
              isRiser ? "text-red-600 bg-red-50 rounded-xl p-1" : "text-green-600 bg-green-50 rounded-xl p-1"
              }`}
            >
              {isRiser ? "▲" : "▼"}
              {formatPercent(product.change.pct)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}