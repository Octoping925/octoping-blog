import { getAllPosts } from "@/lib/notion";
import BLOG from "@/blog.config";
import { Post } from "@/types";
import MainLayout from "@/layouts/main";
import { useRouter } from "next/router";
import { filter, pipe, toArray } from "@fxts/core";

export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: false });

  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
}

const blog = ({ posts }: { posts: Post[] }) => {
  const router = useRouter();
  const category = router.query.category;
  const page = Number(router.query.page ?? 1);

  const categoryPosts =
    typeof category === "string"
      ? pipe(
          posts,
          filter((post) => post.category),
          filter((post) => post.category.includes(category)),
          toArray
        )
      : posts;

  const postsToShow = categoryPosts.slice(
    BLOG.postsPerPage * (page - 1),
    BLOG.postsPerPage * page
  );

  return (
    <MainLayout
      page={page}
      postsToShow={postsToShow}
      totalPosts={categoryPosts}
    />
  );
};

export default blog;
