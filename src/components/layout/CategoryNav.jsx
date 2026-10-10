import CategoryLinks from "./CategoryLinks";

export default async function CategoryNav() {
  const res = await fetch(
    // "https://api.api-store.workers.dev/api/bazardor/categories",

    // Altrenative API 
    "https://openapi.programming-hero.com/api/bazardor/categories",
    
  );
  const categories = await res.json();


  return <CategoryLinks categories={categories} />;
}