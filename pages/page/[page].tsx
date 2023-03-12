import { getAllPosts } from "@/lib/notion";
import BLOG from "@/blog.config";
import { Post } from "@/types";
import MainLayout from "@/layouts/main";

const Page = ({
  postsToShow,
  page,
  totalPosts,
}: {
  postsToShow: Post[];
  page: number;
  totalPosts: Post[];
}) => {
  return (
    <MainLayout
      page={page}
      postsToShow={postsToShow ?? []}
      totalPosts={totalPosts ?? []}
    />
  );
};

export async function getStaticProps(context: any) {
  const param = context.params; // Get Current Page No.
  const page = Number(param.page);

  const posts = await getAllPosts({ includePages: false });
  const postsToShow = posts.slice(
    BLOG.postsPerPage * (Number(page) - 1),
    BLOG.postsPerPage * page
  );

  return {
    props: {
      page, // Current Page
      postsToShow,
      totalPosts: posts,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts({ includePages: false });
  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / BLOG.postsPerPage);

  return {
    // remove first page, we're not gonna handle that.
    paths: Array.from({ length: totalPages - 1 }, (_, i) => ({
      params: { page: String(i + 2) },
    })),
    fallback: true,
  };
}

export default Page;
