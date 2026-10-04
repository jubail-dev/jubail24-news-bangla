
import Link from "next/link";

interface NavLinksType {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const Footer = async () => {
  const response = await fetch(
    "https://news-api-v2.vercel.app/api/categories"
  );

  const data = await response.json();

  const navs: NavLinksType[] = data.data;

  const filterNavs = navs.filter(
    (nav) => nav.scrapable !== false
  );

  return (
    <footer className="mt-12 border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-serif font-bold text-red-700">
              Jubail24 News Bangla
            </h2>

            <p className="text-sm text-gray-500 mt-2 leading-6">
              সত্য ও নির্ভরযোগ্য সংবাদ সবার আগে।
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 text-center mb-3">
              সংবাদ বিভাগ
            </h3>

            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-red-700 transition-colors"
              >
                হোম
              </Link>

              {filterNavs.map((nav) => (
                <Link
                  key={nav.slug}
                  href={`/category/${nav.slug}`}
                  className="text-sm text-gray-600 hover:text-red-700 transition-colors"
                >
                  {nav.title}
                </Link>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="text-center md:text-right">
            <h3 className="text-sm font-bold text-gray-800 mb-3">
              Jubail24 News Bangla
            </h3>

            <p className="text-sm text-gray-500 leading-6">
              দেশের ও বিশ্বের সর্বশেষ সংবাদ,
              তথ্য ও গুরুত্বপূর্ণ খবর একসাথে।
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-7 pt-4 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} Jubail24 News Bangla. সর্বস্বত্ব সংরক্ষিত।
          </p>

          <p className="text-xs text-gray-500">
            Designed & Developed by Jubail
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
