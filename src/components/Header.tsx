"use client";

import Image from "next/image";
import NavLinks from "./NavLinks";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";

const Header = () => {
const date = new Date().toLocaleDateString("bn-BD", {
dateStyle: "full",
});

const { data: session, isPending } = useSession();

return ( <header className="max-w-7xl mx-auto px-4 pt-4">
{/* Top Header Section */} <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">


    {/* Left Column */}
    <div className="hidden md:block"></div>

    {/* Center Column: Logo + Title + Date */}
    <div className="flex items-center justify-center gap-3">
      <Image
        src="/logo.webp"
        alt="Jubail24 News Bangla logo"
        width={48}
        height={48}
        className="w-12 h-12 object-contain rounded-lg"
      />

      <div className="flex flex-col">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-red-700 tracking-tight">
          Jubail24 News Bangla
        </h1>

        <p className="text-xs text-gray-500 mt-0.5">
          {date}
        </p>
      </div>
    </div>

    {/* Right Column: Auth */}
    <div className="flex items-center justify-center md:justify-end">
      {isPending ? (
        <p className="text-sm text-gray-500">লোড হচ্ছে...</p>
      ) : session?.user ? (
        <div className="flex items-center gap-3">

          {/* User Image */}
          <Image
            src={
              session.user.image ||
              "https://images.unsplash.com/photo-1726722886957-2ed42b15aaa3?q=80&w=896&auto=format&fit=crop"
            }
            alt={session.user.name || "User"}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* User Name */}
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              {session.user.name}
            </p>
            <p className="text-xs text-gray-500">
              স্বাগতম
            </p>
          </div>

          {/* Sign Out */}
          <button
            onClick={() => signOut()}
            className="bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-4 py-1.5 rounded transition-colors shadow-sm"
          >
            সাইন আউট
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-gray-700 hover:text-red-700 transition-colors"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-4 py-1.5 rounded transition-colors shadow-sm"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  </div>

  {/* Navigation Section */}
  <div className="mt-4 pb-2">
    <NavLinks />
  </div>
</header>


);
};

export default Header;
