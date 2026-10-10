"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateNameForm({ currentName }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = new FormData(e.currentTarget).get("name").trim();

    if (!name) {
      toast.error("Please enter your name!");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.updateUser({ name });

      if (error) {
        toast.error(error.message || "Update failed!");
        return;
      }

      toast.success("Name updated successfully!");
      router.push("/profile");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-semibold text-gray-900"
        >
          নাম
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={currentName}
          placeholder="আপনার নাম লিখুন"
          autoComplete="name"
          required
          className="w-full rounded-xl border border-gray-200 bg-[#fbfcfb] px-4 py-3 text-gray-900 outline-none placeholder:text-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-100"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-green-700 px-4 py-3 font-semibold text-white shadow-md shadow-green-900/20 transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
      </button>
    </form>
  );
}