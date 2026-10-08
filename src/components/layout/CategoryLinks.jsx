"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryLinks({ categories }) {
  const pathname = usePathname();

  return (
    <nav className="border-t border-gray-100">
      <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
        {categories.map((category) => {
          const isActive = pathname === `/category/${category.slug}`;

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-green-700 text-white"
                  : "text-gray-700 hover:bg-green-50"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}