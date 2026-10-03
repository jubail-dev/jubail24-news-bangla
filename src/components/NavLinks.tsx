import Link from "next/link";

interface NavLinksType {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const NavLinks = async () => {
  const response = await fetch(
    "https://news-api-v2.vercel.app/api/categories"
  );

  const data = await response.json();

  const navs: NavLinksType[] = data.data;

  const filterNavs = navs.filter(
    (nav) => nav.scrapable !== false
  );

  return (
    <nav className="flex items-center justify-center gap-5">
      <Link href="/">হোম</Link>

      {filterNavs.map((nav) => (
        <Link key={nav.slug} href={`/category/${nav.slug}`}>
          {nav.title}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;