import { Suspense } from "react";
import BanglaDate from "@/components/layout/BanglaDate";
import {
  
  formatPrice,
  formatPercent,
  getUnitLabel,
  getTopRisers,
  getTopFallers,
} from "@/lib/utils";

// Ei component ta data fetch kore
async function ProductsData() {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
    cache: "no-store",
  });
  const products = await res.json();

  const risers = getTopRisers(products);
  const fallers = getTopFallers(products);

  return (
    <div className="space-y-4">
      
      <p>মোট পণ্য: {products.length}</p>

      <div>
        <h2 className="font-bold">▲ বেড়েছে</h2>
        {risers.map((p) => (
          <p key={p.id}>
            {p.image} {p.nameBn} - {formatPrice(p.today)} টাকা (
            {getUnitLabel(p.unit)}) ▲ {formatPercent(p.change.pct)}
          </p>
        ))}
      </div>

      <div>
        <h2 className="font-bold">▼ কমেছে</h2>
        {fallers.map((p) => (
          <p key={p.id}>
            {p.image} {p.nameBn} - {formatPrice(p.today)} টাকা ▼{" "}
            {formatPercent(p.change.pct)}
          </p>
        ))}
      </div>
    </div>
  );
}

// Page ta nije async na, shudhu Suspense diye ProductsData ke mure dey
export default function Home() {
  return (
    <div className="p-10">
      <p>
        আজকের তারিখ: <BanglaDate />
      </p>

      <Suspense fallback={<p>Loading...</p>}>
        <ProductsData />
      </Suspense>
    </div>
  );
}