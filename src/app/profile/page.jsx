
"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

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
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span className="loading loading-spinner loading-lg text-green-700"></span>
    </div>
  );
}

if (!session) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="text-gray-600">
        Redirecting to sign in...
      </p>
    </div>
  );
}



  const user = session.user;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="bg-green-700 px-6 py-8 text-white sm:px-8">
          <h1 className="text-2xl font-bold sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-green-100">
            Manage your Bazar-Dor account.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 border-b border-gray-100 pb-8 sm:flex-row">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={80}
                height={80}
                className="h-20 w-20 rounded-full border border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-800">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-900">
                {user.name || "User"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {user.email}
              </p>

              <span
                className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                  user.emailVerified
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {user.emailVerified
                  ? "Email Verified"
                  : "Email Not Verified"}
              </span>
            </div>
          </div>

          <section className="mt-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Account Information
            </h3>

            <div className="space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="mt-1 font-medium text-gray-900">
                  {user.name || "Not available"}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Email Address
                </p>
                <p className="mt-1 break-all font-medium text-gray-900">
                  {user.email}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">User ID</p>
                <p className="mt-1 break-all font-mono text-sm text-gray-700">
                  {user.id}
                </p>
              </div>
            </div>
          </section>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-lg border border-gray-300 px-5 py-3 text-center font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Back to Home
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

