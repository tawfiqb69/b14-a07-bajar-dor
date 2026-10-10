import { Suspense } from "react";

import {
  getTopRisers,
  getTopFallers,
} from "@/lib/utils";
import HeroBanner from "@/components/home/HeroBanner";
import PriceMovers from "@/components/home/PriceMovers";
import AllProducts from "@/components/home/AllProducts";



function ProductsSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 h-8 w-56 animate-pulse rounded-lg bg-gray-200"></div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>

              <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>

              <div className="mt-4 h-8 w-2/3 animate-pulse rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 h-8 w-40 animate-pulse rounded-lg bg-gray-200"></div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-4"
            >
              <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200"></div>

              <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>

              <div className="mt-4 h-8 w-2/3 animate-pulse rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function ProductsData() {
  const res = await fetch(
    // "https://api.api-store.workers.dev/api/bazardor/products",


      // Alternative API 
    "https://openapi.programming-hero.com/api/bazardor/products", 
    
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


export default function Home() {
  return (
    <div className="space-y-8">
      
      <HeroBanner />

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsData />
      </Suspense>

    </div>
  );
}