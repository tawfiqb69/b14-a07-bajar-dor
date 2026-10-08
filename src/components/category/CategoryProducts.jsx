"use client";

import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";

export default function CategoryProducts({ products }) {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low") {
      return a.today - b.today;
    }

    if (sortOrder === "high") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <div className="">
      {/* Sort */}
      <div className=" bg-white rounded-xl py-3 px-4 mb-5 flex items-center justify-end gap-2">
        <label
          htmlFor="sort"
          className="text-sm text-gray-500"
        >
          সাজান:
        </label>

        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-1 py-2 text-sm text-gray-700 outline-none"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="my-3 text-sm text-gray-500">
          মোট {products.length} টি পণ্য দেখানো হচ্ছে
        </p>

      {/* Products */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 ">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}