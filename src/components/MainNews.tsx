
import Image from "next/image";
import Link from "next/link";

interface MainNewsType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  imageAlt: string;
}

interface MainNewsProps {
  news: MainNewsType[];
}

const MainNews = ({ news }: MainNewsProps) => {
  const [firstNews, ...othersNews] = news;

  if (!firstNews) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Link
          href={`/news-detail/${firstNews.id}`}
          className="group block lg:col-span-2"
        >
          <article className="h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 sm:aspect-[16/8.5] lg:max-h-[390px]">
              <Image
                src={firstNews.imageUrl}
                alt={firstNews.imageAlt || firstNews.title}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            <div className="p-4 sm:p-6">
              {firstNews.category && (
                <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-red-600 sm:text-sm">
                  {firstNews.category}
                </span>
              )}

              <h2 className="text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-red-600 sm:text-2xl lg:text-3xl">
                {firstNews.title}
              </h2>

              {firstNews.description && (
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 sm:text-base">
                  {firstNews.description}
                </p>
              )}
            </div>
          </article>
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="divide-y divide-gray-200">
            {othersNews.slice(0, 5).map((item) => (
              <Link
                key={item.id}
                href={`/news-detail/${item.id}`}
                className="group block py-4 first:pt-0 last:pb-0"
              >
                {item.category && (
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-red-600">
                    {item.category}
                  </span>
                )}

                <h3 className="line-clamp-2 text-sm font-bold leading-6 text-gray-900 transition-colors group-hover:text-red-600 sm:text-base">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainNews;

