import Link from "next/link";

interface MostReadType {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string;
  lastPublished: string;
  source: string;
}

// ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর করার ফাংশন

const MostRead = async () => {
  const response = await fetch(
    "https://news-api-v2.vercel.app/api/news/most-read",
    { cache: "no-store" }
  );
  const data = await response.json();
  const news: MostReadType[] = data.data || [];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm">
      {/* সেকশন হেডার */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 border-b-2 border-red-600 pb-2 mb-4">
        সর্বাধিক পঠিত
      </h2>

      {/* সংবাদের তালিকা */}
      <div className="divide-y divide-gray-100">
        {news.map((item, index: number) => (
          <div
            key={item.id || index}
            className="py-3.5 first:pt-0 last:pb-0 group cursor-pointer"
          >
            <Link href={`/news-detail/${item.id}`}>
              <div className="flex items-start gap-3.5">
              {/* সংবাদের র্যাঙ্ক/ক্রমিক নম্বর (১, ২, ৩...) */}
              <span className="flex-shrink-0 text-2xl font-black text-gray-300 group-hover:text-red-600 transition-colors w-6 text-center leading-none mt-0.5">
                {(index + 1)}
              </span>

              {/* ক্যাটাগরি ও হেডলাইন */}
              <div className="space-y-1 flex-1">
                
                <h3 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostRead;