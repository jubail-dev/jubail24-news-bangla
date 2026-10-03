
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
    <div className="bg-red-600 text-white text-2xl font-semibold">
      <div className="flex">

        <div className="bg-red-800 py-2 px-4 font-bold shrink-0">
          সর্বশেষ
        </div>

        <div className="min-w-0 overflow-hidden">
          <MarqueeText
            className="py-2"
            direction="right"
            duration={15}
          >
            {headLines.map((h, ind) => (
              <span key={ind}>
                <span>{h.title}</span>

                <span className="mx-5">
                  •
                </span>
              </span>
            ))}
          </MarqueeText>
        </div>

      </div>
    </div>
  );
};

export default Marquee;

