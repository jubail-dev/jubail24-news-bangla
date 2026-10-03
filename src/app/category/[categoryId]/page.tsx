
import NewsCard from "@/components/NewsCard";
interface CategoryNewsType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  imageAlt?: string;
}

const CategoryPage =async ({params} : {params: Promise<{categoryId: string}>}) => {
    const {categoryId} = await params
    console.log(categoryId);

    const response = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`)
    const data = await response.json()
    const categoryNews : CategoryNewsType[] = data.data
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold border-b-2 border-red-500 pb-2 mb-4">{data.title}</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {
                    categoryNews.map(news => <NewsCard key={news.id} news={news}></NewsCard>)
                }
            </div>
            
        </div>
    );
};

export default CategoryPage;

