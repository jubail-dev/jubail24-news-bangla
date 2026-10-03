import Marquee from "@/components/Marquee";
import MainNews from "./MainNews";

export default function Home() {
  return (
    <div>
      <Marquee></Marquee>

      <div className="grid grid-cols-3 gap-4 container mx-auto my-4">
        {/* News Section */}
          <div className=" col-span-2">
            <MainNews></MainNews>
          </div>

          {/* Mosth Readed */}
          <div className="bg-green-500 col-span-1 p-30"></div>

      </div>
    </div>
  );
}
