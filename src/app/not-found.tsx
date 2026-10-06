import Link from "next/link";

const NotFount = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-7xl font-bold text-red-700">
          404
        </p>

        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরিয়ে দেওয়া হয়েছে
          অথবা ঠিকানাটি ভুল হয়েছে।
        </p>

        <Link
          href="/"
          className="inline-block mt-6 bg-red-700 hover:bg-red-800 text-white text-sm font-medium px-5 py-2.5 rounded transition-colors"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default NotFount;