"use client";

import Link from "next/link";

export default function UserMenu() {
  // Dummy user (pore BetterAuth theke asbe)
  const user = { name: "Rezwan Ahmed", email: "rezwanahmed@gmail.com" };
  const firstName = user.name.split(" ")[0];

  return (
    <div className="dropdown dropdown-end">
      {/* Button: avatar + naam + chhoto arrow */}
      <div
        tabIndex={0}
        role="button"
        className="flex cursor-pointer items-center gap-2"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-lg font-semibold text-green-800">
          {firstName[0]}
        </div>
        <span className="hidden font-medium sm:inline">{firstName}</span>
        <span className="text-[10px] text-gray-500">▼</span>
      </div>

      {/* Dropdown menu */}
      <div
        tabIndex={0}
        className="dropdown-content z-50 mt-3 w-72 rounded-2xl border border-gray-200 bg-[#fbfcfb] p-5 shadow-lg"
      >
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>

        <ul className="mt-5 space-y-3">
          <li>
            <Link href="/profile" className="flex items-center gap-2">
              <span>👤</span>
              <span>আমার প্রোফাইল</span>
            </Link>
          </li>
          <li>
            <button className="flex cursor-pointer items-center gap-2 text-red-600">
              <span>↩</span>
              <span>সাইন আউট</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}