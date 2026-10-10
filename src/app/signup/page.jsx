"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/auth/SocialButtons";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-[#fbfcfb] px-4 py-3 text-gray-900 outline-none placeholder:text-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-100";

const labelClass = "mb-1.5 block text-sm font-semibold text-gray-900";

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { name, email, password, confirmPassword } = Object.fromEntries(
      formData.entries(),
    );

  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });
      console.log("Signup response:", { data, error });

      if (error) {
        toast.error(error.message || "Signup failed!");
        return;
      }

      if (data) {
        toast.success("Account created successfully! Please sign in.");
        router.push("/signin");
        router.refresh();
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto flex max-w-105 flex-col items-center py-8 sm:py-10">
      <h1 className="text-3xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mt-2 text-center text-sm text-gray-600">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <div className="mt-6 w-full rounded-3xl border border-gray-200 bg-[#fbfcfb] p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className={labelClass}>
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              autoComplete="name"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              autoComplete="new-password"
              minLength={8}
              maxLength={128}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="আবার লিখুন"
              autoComplete="new-password"
              minLength={8}
              maxLength={128}
              required
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-green-700 px-4 py-3 font-semibold text-white shadow-md shadow-green-900/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <SocialButtons disabled={isLoading} />

        <p className="mt-5 text-center text-sm text-gray-900">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-green-700 hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="mt-6 text-sm text-gray-600 hover:text-green-700">
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}