import { getAllPosts } from "@/lib/notion";
import BLOG from "@/blog.config";
import { Post } from "@/types";
import MainLayout from "@/layouts/main";
import { useRouter } from "next/router";

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
  const page = Number(router.query.page ?? 1);

  const postsToShow = posts.slice(
    BLOG.postsPerPage * (Number(page) - 1),
    BLOG.postsPerPage * page
  );

  return (
    <MainLayout page={page} postsToShow={postsToShow} totalPosts={posts} />
  );
};

export default blog;
