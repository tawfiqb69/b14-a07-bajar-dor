import ProductCard from "@/components/product/ProductCard";

export default function AllProducts({ products }) {
  return (
    <section id="products" className="mt-12">
      <div className="mb-5">
        <p className="text-sm font-semibold text-green-700">
          বাজারের সব পণ্য
        </p>

        <div className="mt-1 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            সকল পণ্য
          </h2>

          <span className="text-sm text-gray-500">
            মোট {products.length} টি পণ্য
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 ">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}