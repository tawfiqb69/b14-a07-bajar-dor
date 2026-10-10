"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const signingOut = useRef(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Login na thakle sign in page e pathao
  useEffect(() => {
    if (!isPending && !session && !signingOut.current) {
      toast.error("Please sign in to view your profile!", {
        id: "auth-required",
      });
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  const handleSignOut = async () => {
    try {
      signingOut.current = true;

      const { error } = await authClient.signOut();

      if (error) {
        signingOut.current = false;
        toast.error(error.message || "Sign out failed!");
        return;
      }

      toast.success("Signed out successfully!");
      router.push("/signin");
      router.refresh();
    } catch (error) {
      signingOut.current = false;
      toast.error(error.message || "Something went wrong!");
    }
  };

  // Loading skeleton
  if (isPending || !user) {
    return (
      <section className="space-y-5">
        <div className="space-y-2">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-4 w-64" />
        </div>
        <div className="skeleton h-32 w-full rounded-3xl" />
        <div className="skeleton h-64 w-full rounded-3xl" />
      </section>
    );
  }

  return (
    <section className="space-y-5">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm text-gray-600">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* User card */}
      <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-[#fbfcfb] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-green-100 text-3xl font-bold text-green-800">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                height={90}
                width={90}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            ) : (
              user.name?.charAt(0).toUpperCase() || "U"
            )}
          </div>

          <div className="min-w-0">
            <p className="text-xl font-semibold text-gray-900">{user.name}</p>
            <p className="break-all text-gray-600">{user.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-fit cursor-pointer items-center gap-1.5 rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <span>↩</span>
          <span>সাইন আউট</span>
        </button>
      </div>

{/* তথ্য card */}
<div className="rounded-3xl border border-gray-200 bg-[#fbfcfb] p-5 sm:p-6">
  <h2 className="mb-5 text-lg font-semibold text-gray-900">তথ্য</h2>

  <div className="space-y-4 sm:px-6 sm:pb-4">
    <div>
      <p className="mb-1.5 text-sm font-semibold text-gray-900">নাম</p>
      <div className="min-h-12 w-full rounded-xl border border-gray-200 bg-[#fbfcfb] px-4 py-3 text-gray-900">
        {user.name}
      </div>
    </div>

    <Link
      href="/profile/update"
      className="block w-full rounded-xl bg-green-700 px-4 py-3 text-center font-semibold text-white shadow-md shadow-green-900/20 transition hover:bg-green-800"
    >
      আপডেট
    </Link>
  </div>
</div>
    </section>
  );
}