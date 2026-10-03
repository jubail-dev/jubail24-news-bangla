import MainNews from "@/components/MainNews";
import NewsCard from "@/components/NewsCard";
import MostRead from "@/components/MostRead";

interface OtherSectionType {
  curationId: string,
  title: string,
  articles: {
    id: string,
    title: string,
    description: string,
    category: string,
    imageUrl: string,
    imageAlt: string
  }[],
}


export default async function Home() {
  const response = await fetch(
    "https://news-api-v2.vercel.app/api/news/sections",
    { cache: "no-store" }
  );
  const data = await response.json();
  const section = data.data;

  const [firstSection, ...othersSection] = section;
  const mainNews = firstSection?.articles || [];
  const excludedCategories = [
  "বিবিসি বাংলা এখন হোয়াটসঅ্যাপে!",
  "বিবিসি বাংলা এখন ইন্সটাগ্রামে!",
];

const filteredOthersNews = othersSection.filter(
  (item : OtherSectionType) => !excludedCategories.includes(item.title)
);
  return (
    <main className="min-h-screen bg-gray-50/50 pb-10">
      {/* মার্কি সেকশন */}
      

      {/* প্রধান লেআউট কন্টেইনার */}
      <div className="container mx-auto px-4 my-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* বাম পাশ: মূল সংবাদ ও অন্যান্য সেকশন (২ কলাম জুড়ে) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* টপ মেইন নিউজ সেকশন */}
          <MainNews news={mainNews} />

          {/* ক্যাটাগরি অনুযায়ী অন্যান্য সংবাদের সেকশন */}
          <div className="space-y-8">
            {filteredOthersNews.map((sec :OtherSectionType) => (
              <section key={sec.curationId} className="space-y-4">
                {/* সেকশন হেডার */}
                <div className="border-b-2 border-red-600 pb-1 flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {sec.title}
                  </h2>
                </div>

                {/* সংবাদের গ্রিড (মোবাইলে ১টা, ট্যাবলেটে ২টা, ডেস্কটপে ৩টা) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {sec.articles?.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </section>
            ))}
          </div>

        </div>

        {/* ডান পাশ: সর্বাধিক পঠিত / সাইডবার (১ কলাম জুড়ে) */}
        <div>
          <MostRead></MostRead>
        </div>

      </div>
    </main>
  );
}