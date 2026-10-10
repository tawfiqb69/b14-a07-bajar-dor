import Link from "next/link";

export const metadata = {
  title: "পেজ পাওয়া যায়নি | বাজার দর",
};

export default function NotFound() {
  return (
    <section className="py-16 text-center sm:py-24">
      <div className="mx-auto max-w-md rounded-3xl border border-gray-200 bg-[#fbfcfb] p-8">
        <div className="text-6xl">🛒</div>

        <p className="mt-4 text-5xl font-bold text-green-700">৪০৪</p>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          আপনি যে পেজটি খুঁজছেন সেটি নেই, সরানো হয়েছে অথবা লিংকটি ভুল।
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-green-900/20 transition hover:bg-green-800"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </section>
  );
}