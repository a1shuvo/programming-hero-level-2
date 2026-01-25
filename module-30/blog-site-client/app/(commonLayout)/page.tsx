import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function Home() {
  const { data } = await blogService.getBlogPosts(
    {
      isFeatured: false,
      search: "post 1",
    },
    {
      revalidate: 10,
      // cache: "no-store",
    },
  );
  return (
    <div className="grid grid-cols-3 max-w-7xl mx-auto gap-5 px-4">
      {data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
