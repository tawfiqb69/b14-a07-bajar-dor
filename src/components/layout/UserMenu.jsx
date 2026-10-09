
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UserMenu() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
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

  if (isPending) {
    return <div className="skeleton h-10 w-24 rounded-lg" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Sign In
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  

  return (
    <div className="dropdown dropdown-end">
      <button
        type="button"
        tabIndex={0}
        className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 hover:bg-gray-50"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-bold text-green-800">
          {user.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold text-gray-900">
            {user.name}
          </p>
          <p className="max-w-36 truncate text-xs text-gray-500">
            {user.email}
          </p>
        </div>

        <span aria-hidden="true">▾</span>
      </button>

      <ul
        tabIndex={0}
        className="menu dropdown-content z-50 mt-2 w-52 rounded-box border border-gray-200 bg-white p-2 shadow-lg"
      >
        <li>
          <Link href="/profile">My Profile</Link>
        </li>

        <li>
          <button type="button" onClick={handleSignOut}>
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}

