import { Suspense } from "react";
import BanglaDate from "@/components/layout/BanglaDate";
import {
  
  formatPrice,
  formatPercent,
  getUnitLabel,
  getTopRisers,
  getTopFallers,
} from "@/lib/utils";
import HeroBanner from "@/components/home/HeroBanner";
import PriceMovers from "@/components/home/PriceMovers";
import AllProducts from "@/components/home/AllProducts";

// Ei component ta data fetch kore


async function ProductsData() {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  const products = await res.json();

  const risers = getTopRisers(products);
  const fallers = getTopFallers(products);

  return (
    <div>
      <PriceMovers
        risers={risers}
        fallers={fallers}
      />

      <AllProducts products={products} />
    </div>
  );
}





// Page ta nije async na, shudhu Suspense diye ProductsData ke mure dey
export default function Home() {
  return (
    <div className="space-y-8">
      
      <HeroBanner />

      

      <Suspense fallback={<p>Loading...</p>}>
        <ProductsData />
      </Suspense>
    </div>
  );
}