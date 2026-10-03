
import Image from "next/image";

const NewsDetailsPage = async ({
  params,
}: {
  params: Promise<{ newsDetailsId: string }>;
}) => {
  const { newsDetailsId } = await params;

  const response = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsDetailsId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            সংবাদটি পাওয়া যায়নি
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-500">
            এই সংবাদটি বর্তমানে উপলব্ধ নেই।
          </p>
        </div>
      </main>
    );
  }

  const data = await response.json();
  const news = data?.data;

  if (!news) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            সংবাদটি পাওয়া যায়নি
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-500">
            অনুগ্রহ করে অন্য একটি সংবাদ চেষ্টা করুন।
          </p>
        </div>
      </main>
    );
  }

  const publishedDate = news.firstPublished
    ? new Date(news.firstPublished).toLocaleDateString("bn-BD", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const leadText =
    news.description?.blocks?.[0]?.model?.blocks?.[0]?.model?.text;

  const body = Array.isArray(news.body) ? news.body : [];

  const firstImageIndex = body.findIndex(
    (item: { type?: string; url?: string }) =>
      item.type === "image" && item.url
  );

  return (
    <main className="min-h-screen bg-slate-50 py-6 sm:py-10 lg:py-14">
      <article className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <header className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-8 lg:p-10">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {news.category && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 sm:text-sm">
                {news.category}
              </span>
            )}

            {publishedDate && (
              <span className="text-xs text-slate-500 sm:text-sm">
                {publishedDate}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {news.title}
          </h1>

          {leadText && (
            <div className="mt-6 rounded-xl border-l-4 border-blue-600 bg-blue-50 px-4 py-4 sm:px-5">
              <p className="text-sm leading-7 text-slate-700 sm:text-lg sm:leading-8">
                {leadText}
              </p>
            </div>
          )}

          {news.byline?.length > 0 && (
            <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5">
              {news.byline.map(
                (
                  author: {
                    name: string;
                    role: string;
                  },
                  index: number
                ) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      {author.name?.charAt(0) || "A"}
                    </div>

                    <div className="leading-tight">
                      <p className="text-xs font-semibold text-slate-800 sm:text-sm">
                        {author.name}
                      </p>

                      {author.role && (
                        <p className="text-[11px] text-slate-500 sm:text-xs">
                          {author.role}
                        </p>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </header>

        {news.imageUrl && (
          <figure className="mt-6 overflow-hidden rounded-2xl bg-slate-200 shadow-md sm:mt-8">
            <Image
              src={news.imageUrl}
              width={550}
              height={550}
              alt={news.title || "News image"}
              className="h-auto max-h-[550px] w-full object-cover object-center"
            />
          </figure>
        )}

        <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-8 lg:p-10">
          <div className="space-y-7">
            {body.map(
              (
                item: {
                  type: string;
                  text?: string;
                  url?: string;
                  caption?: string;
                  altText?: string;
                },
                index: number
              ) => {
                if (item.type === "text" && item.text) {
                  return (
                    <p
                      key={index}
                      className="text-base leading-8 text-slate-700 sm:text-lg sm:leading-9"
                    >
                      {item.text}
                    </p>
                  );
                }

                if (item.type === "subheading" && item.text) {
                  return (
                    <h2
                      key={index}
                      className="pt-3 text-xl font-bold leading-tight text-slate-900 sm:text-2xl lg:text-3xl"
                    >
                      {item.text}
                    </h2>
                  );
                }

                if (item.type === "image" && item.url) {
                  if (index === firstImageIndex) {
                    return null;
                  }

                  return (
                    <figure
                      key={index}
                      className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50"
                    >
                      <Image
                        src={item.url}
                        width={550}
                        height={550}
                        alt={
                          item.altText ||
                          news.title ||
                          "Article image"
                        }
                        className="h-auto max-h-[500px] w-full object-cover object-center"
                      />

                      {item.caption && (
                        <figcaption className="border-t border-slate-200 bg-slate-50 px-4 py-3 text-center text-xs leading-5 text-slate-500 sm:text-sm">
                          {item.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }

                return null;
              }
            )}
          </div>
        </div>
      </article>
    </main>
  );
};

export default NewsDetailsPage;

