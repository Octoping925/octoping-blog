import PostLayout from "@/layouts/post";
import { getAllPosts, getPostBlocks } from "@/lib/notion";
import BLOG from "@/blog.config";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { getCategoriesFromPosts } from "@/lib/notion/getCategoriesFromPosts";

const BlogPost = ({
  post,
  blockMap,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!post) return null;

  return (
    <PostLayout
      blockMap={blockMap}
      frontMatter={post}
      fullWidth={post.fullWidth}
      category={category}
    />
  );
};

export async function getStaticPaths() {
  const posts = await getAllPosts({ includePages: true });

  return {
    paths: posts.map((row) => `${BLOG.path}/${row.slug}`),
    fallback: true,
  };
}

export async function getStaticProps({
  params: { slug },
}: GetStaticPropsContext) {
  const posts = await getAllPosts({ includePages: true });
  const category = getCategoriesFromPosts(posts);

  const post = posts.find((t) => t.slug === slug);
  const blockMap = await getPostBlocks(post.id);

  return {
    props: { post, category, blockMap },
    revalidate: 1,
  };
}

export default BlogPost;
