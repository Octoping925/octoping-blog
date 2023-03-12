import Container from "@/components/Container";
import BlogPost from "@/components/BlogPost";
import Pagination from "@/components/Pagination";
import { getAllPosts } from "@/lib/notion";
import BLOG from "@/blog.config";
import { Post } from "@/types";

export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: false });
  const postsToShow = posts.slice(0, BLOG.postsPerPage);
  const totalPosts = posts.length;

  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      totalPosts,
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
  totalPosts: number;
}) => {
  return (
    <Container
      title={BLOG.title}
      description={BLOG.description}
      layout={undefined}
      fullWidth={false}
    >
      {postsToShow.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
      <Pagination page={page} totalPosts={totalPosts} />
    </Container>
  );
};

export default blog;
