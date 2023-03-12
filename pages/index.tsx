import { getAllPosts } from "@/lib/notion";
import BLOG from "@/blog.config";
import { Post } from "@/types";
import MainLayout from "@/layouts/main";
import { useRouter } from "next/router";
import { filter, map, pipe, toArray, uniq } from "@fxts/core";

export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: false });
  const category = pipe(
    posts,
    map((post) => post.category?.[0]),
    filter((category) => category),
    uniq,
    toArray
  );

  console.log(category);

  return {
    props: {
      posts,
      category,
    },
    revalidate: 1,
  };
}

const blog = ({ posts, category }: { posts: Post[]; category: string[] }) => {
  const router = useRouter();

  const selectedCategory = router.query.category;
  const categoryPosts =
    typeof selectedCategory === "string"
      ? posts.filter((post) => post.category?.includes(selectedCategory))
      : posts;

  const page = Number(router.query.page ?? 1);
  const postsToShow = categoryPosts.slice(
    BLOG.postsPerPage * (page - 1),
    BLOG.postsPerPage * page
  );

  return (
    <MainLayout
      page={page}
      postsToShow={postsToShow}
      totalPosts={categoryPosts}
      category={category}
    />
  );
};

export default blog;
