import Image from "next/image";
import React from "react";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  imageAlt?: string;
}

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  if (!news) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group">
      <div>
        {/* ছবির অংশ */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
          <Image
            src={news.imageUrl}
            alt={news.imageAlt || news.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        {/* কন্টেন্ট অংশ */}
        <div className="p-3.5 space-y-1.5">
          <span className="block text-red-600 font-bold text-xs">
            {news.category}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
            {news.title}
          </h3>
          <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
            {news.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;