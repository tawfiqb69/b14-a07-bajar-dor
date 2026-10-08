
import {
  formatPrice,
  formatPercent,
  getUnitShort,
  getChangeStyle,
} from "@/lib/utils";

export default async function PriceTicker() {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  const products = await res.json();

  const items = products.map((product) => {
    const style = getChangeStyle(product.change.dir);

    return (
      <div
        key={product.id}
        className="flex shrink-0 items-center gap-2 border-r border-gray-200 px-5 py-3 text-sm"
      >
        <span>{product.image}</span>

        <span className="font-medium text-gray-800">
          {product.nameBn}
        </span>

        <span className="text-gray-500">
          {formatPrice(product.today)} টাকা/
          {getUnitShort(product.unit)}
        </span>

        <span className={`font-semibold ${style.color}`}>
          {style.arrow} {formatPercent(product.change.pct)}
        </span>
      </div>
    );
  });

  return (
    <div className="overflow-hidden border-b border-gray-200 bg-[#fbfcfb]">
      <div className="marquee-track">
        <div className="flex shrink-0">{items}</div>
        <div className="flex shrink-0">{items}</div>
      </div>
    </div>
  );
}

