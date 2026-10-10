"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";

export default function UserMenu() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Dropdown bondho korar jonno (click korar por focus soriye dey)
  const closeMenu = () => document.activeElement?.blur();

  const handleSignOut = async () => {
    closeMenu();

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Sign out failed!");
        return;
      }

      toast.success("Signed out successfully!");
      router.push("/signin");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  // Loading
  if (isPending) {
    return <div className="skeleton h-10 w-28 rounded-xl" />;
  }

  // Login kora nei
  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-xl bg-green-700 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const firstLetter= user.name?.[0] || "User";

  return (
    <div className="dropdown dropdown-end">
      {/* Button: avatar + naam + chhoto arrow */}
      <button
        type="button"
        tabIndex={0}
        className="flex cursor-pointer items-center gap-3"
      >
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-green-100 text-lg font-bold text-green-800 sm:h-11 sm:w-11">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={40}
              height={40}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          ) : (
            firstLetter
            // firstName.charAt(0).toUpperCase()
          )}
        </div>

        <span className="hidden text-base font-medium text-gray-900 sm:inline">
          {user.name}
          {/* {firstName} */}
        </span>

        <span aria-hidden="true" className="text-[10px] text-gray-500">
          ▼
        </span>
      </button>

      {/* Dropdown card */}
      <div
        tabIndex={0}
        className="dropdown-content z-50 mt-3 w-72 rounded-2xl border border-gray-200 bg-[#fbfcfb] p-6 pb-9 shadow-lg"
      >
        <p className="text-xl font-semibold text-gray-900">{user.name}</p>
        <p className="mt-1 break-all text-sm text-gray-500">{user.email}</p>

        <div className="mt-6 space-y-4">
          <Link
            href="/profile"
            onClick={closeMenu}
            className="flex items-center gap-2 text-gray-900 hover:text-green-700"
          >
            <span>👤</span>
            <span>আমার প্রোফাইল</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex cursor-pointer items-center gap-2 text-red-600 hover:text-red-700"
          >
            <span>↩</span>
            <span>সাইন আউট</span>
          </button>
        </div>
      </div>
    </div>
  );
}