
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() { 
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      ...user,
    });

    if (error) {
      toast.error(error.message || "Signup failed!");
      return;
    }

    if (data) {
      toast.success("Account created successfully!");
      router.push("/");
      router.refresh();
    }
  } catch (error) {
    toast.error(
      error.message || "Something went wrong. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Create Account
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Join Bazar-Dor to get started.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              minLength={8}
              maxLength={128}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}

