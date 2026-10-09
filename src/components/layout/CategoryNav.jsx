import CategoryLinks from "./CategoryLinks";

export default async function CategoryNav() {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    { cache: "no-store" }
  );
  const categories = await res.json();


  return <CategoryLinks categories={categories} />;
}