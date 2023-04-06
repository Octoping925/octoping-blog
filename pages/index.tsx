import { getAllPosts } from "@/lib/notion";
import BLOG from "@/blog.config";
import MainLayout from "@/layouts/main";
import { useRouter } from "next/router";
import { InferGetStaticPropsType } from "next";
import { getCategoriesFromPosts } from "@/lib/notion/getCategoriesFromPosts";

export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: false });
  const category = getCategoriesFromPosts(posts);

  return {
    props: {
      posts,
      category,
    },
    revalidate: 1,
  };
}

const blog = ({
  posts,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
