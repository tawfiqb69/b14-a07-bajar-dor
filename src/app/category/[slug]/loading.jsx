
export default function Loading() {
  return (
    <section className="animate-pulse">
      {/* Category Header Skeleton */}
      <div className="my-5 flex items-center gap-3 rounded-xl bg-white px-4 py-3">
        <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200"></div>

        <div className="flex-1 space-y-2">
          <div className="h-5 w-40 rounded bg-gray-200"></div>
          <div className="h-4 w-56 max-w-full rounded bg-gray-200"></div>
        </div>
      </div>

      {/* Products Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-4"
          >
            <div className="h-6 w-3/4 rounded bg-gray-200"></div>
            <div className="mt-4 h-4 w-1/2 rounded bg-gray-200"></div>
            <div className="mt-4 h-8 w-2/3 rounded bg-gray-200"></div>
            <div className="mt-5 h-10 rounded-xl bg-gray-200"></div>
          </div>
        ))}
      </div>
    </section>
  );
}