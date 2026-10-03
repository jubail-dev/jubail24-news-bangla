import Image from "next/image";

interface MainNewsType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  imageAlt: string;
}

const MainNews = async () => {
  const response = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections",
    { cache: "no-store" }
  );
  const data = await response.json();
  const section = data.data;
  const mainNews: MainNewsType[] = section[0].articles;
  const [firstNews, ...othersNews] = mainNews;

  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        
        {/* First News */}
        {firstNews && (
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative w-full aspect-[16/9] max-h-72 sm:max-h-80">
                <Image
                  src={firstNews.imageUrl}
                  alt={firstNews.imageAlt || firstNews.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>

              <div className="p-4 sm:p-5 space-y-2">
                <span className="block text-red-600 font-bold text-xs sm:text-sm">
                  {firstNews.category}
                </span>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-red-700 leading-snug hover:text-red-800 transition-colors cursor-pointer">
                  {firstNews.title}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {firstNews.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Others News */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm flex flex-col justify-between">
          <div className="divide-y divide-gray-200 flex flex-col justify-between h-full">
            {othersNews.slice(0, 5).map((news) => (
              <div key={news.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                <span className="block text-red-600 font-bold text-xs">
                  {news.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 hover:text-red-600 transition-colors cursor-pointer leading-snug line-clamp-2">
                  {news.title}
                </h3>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MainNews;