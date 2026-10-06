
import Image from "next/image";
import NavLinks from "./NavLinks";
import Link from "next/link";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="max-w-7xl mx-auto px-4 pt-4">

      {/* Top Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">

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

        {/* Right Column: Auth Buttons */}
          <UserInfo></UserInfo>

      </div>

      {/* Navigation Section */}
      <div className="mt-4 pb-2">
        <NavLinks />
      </div>

    </header>
  );
};

export default Header;

