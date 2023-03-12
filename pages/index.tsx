import { getAllPosts } from "@/lib/notion";
import BLOG from "@/blog.config";
import { Post } from "@/types";
import MainLayout from "@/layouts/main";

export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: false });
  const postsToShow = posts.slice(0, BLOG.postsPerPage);

  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      totalPosts: posts,
    },
    revalidate: 1,
  };
}

const blog = ({
  postsToShow,
  page,
  totalPosts,
}: {
  postsToShow: Post[];
  page: number;
  totalPosts: Post[];
}) => {
  return (
    <MainLayout page={page} postsToShow={postsToShow} totalPosts={totalPosts} />
  );
};

export default blog;
