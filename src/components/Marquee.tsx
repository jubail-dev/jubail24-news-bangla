
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface MarqueeTitleType {
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

const Marquee = async () => {
  const response = await fetch(
    "https://news-api-v2.vercel.app/api/news?limit=10"
  );

  const data = await response.json();

  const headLines: MarqueeTitleType[] = data.data;

  return (
    <div className="w-full bg-red-600 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
      <div className="flex w-full">

        <div className="bg-red-800 py-2 px-2 sm:px-3 md:px-4 font-bold shrink-0">
          সর্বশেষ
        </div>

        <div className="flex-1 min-w-0 overflow-hidden">
          <MarqueeText
            className="py-2"
            direction="right"
            duration={15}
          >
            {headLines.map((h, ind) => (
              <Link key={ind} href={`/news-detail/${h.id}`}>

                <span >
                <span className="hover:underline">{h.title}</span>

                <span className="mx-3 sm:mx-4 md:mx-5">
                  •
                </span>
              </span>

              </Link>
            ))}
          </MarqueeText>
        </div>

      </div>
    </div>
  );
};

export default Marquee;

