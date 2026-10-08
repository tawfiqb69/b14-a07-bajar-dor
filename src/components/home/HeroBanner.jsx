import Image from "next/image";
import Link from "next/link";
import BanglaDate from "../layout/BanglaDate";

export default function HeroBanner() {
  return (
    <section className="overflow-hidden rounded-3xl bg-white">
      <div className="px-6 pt-3 sm:px-10 md:px-12">
        {/* Date */}
        <p className="inline-block rounded-lg bg-green-100 px-3 py-0.5 text-sm font-medium leading-4 text-green-700">
           <BanglaDate />
        </p>

        {/* Hero Content */}
        <div className="-mt-3 flex flex-col items-center justify-between gap-4 pb-5 md:flex-row md:pb-4">
          {/* Left Content */}
          <div className="max-w-xl">
            <h1 className="m-0 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-2 max-w-lg text-sm leading-6 text-gray-600">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="#products"
              className="mt-4 inline-flex rounded-xl bg-green-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-800"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Right Image */}
          <div className="w-full max-w-xs md:max-w-sm">
            <Image
              src="/images/bazar-hero.png"
              alt="বাজারের পণ্য"
              width={400}
              height={300}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
