"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import UpdateNameForm from "@/components/profile/UpdateNameForm";

export default function UpdateProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Login na thakle sign in page e pathao
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("Please sign in first!", { id: "auth-required" });
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  // Loading skeleton
  if (isPending || !user) {
    return (
      <section className="space-y-5">
        <div className="space-y-2">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-4 w-64" />
        </div>
        <div className="skeleton h-56 w-full rounded-3xl" />
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <Link
        href="/profile"
        className="inline-block text-sm text-gray-600 hover:text-green-700"
      >
        ← প্রোফাইলে ফিরে যান
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-gray-900">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-sm text-gray-600">
          আপনার নাম পরিবর্তন করে সেভ করুন।
        </p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-[#fbfcfb] p-5 sm:p-6">
        <h2 className="mb-5 text-lg font-semibold text-gray-900">তথ্য</h2>
        <div className="sm:px-6 sm:pb-4">
          <UpdateNameForm currentName={user.name} />
        </div>
      </div>
    </section>
  );
}