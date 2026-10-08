import Image from "next/image";
import Link from "next/link";
import BanglaDate from "./BanglaDate";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 sm:h-12 sm:w-12">
          <Image
            src="/images/logo-icon.png"
            alt="বাজার দর"
            width={24}
            height={24}
            className="brightness-0 invert"
          />
        </div>
        <div>
          <p className="text-xl font-bold leading-tight">বাজার দর</p>
          <p className="text-xs text-gray-600">
            <BanglaDate />
          </p>
        </div>
      </Link>

      <UserMenu />
    </div>
  );
}