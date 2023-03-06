import Layout from "@/layouts/layout";
import { getAllPosts, getPostBlocks } from "@/lib/notion";
import BLOG from "@/blog.config";
import { createHash } from "crypto";
import { Post } from "@/types";
import { ExtendedRecordMap } from "notion-types";

const BlogPost = ({
  post,
  blockMap,
}: {
  post: Post;
  blockMap: ExtendedRecordMap;
}) => {
  if (!post) return null;

  return (
    <Layout blockMap={blockMap} frontMatter={post} fullWidth={post.fullWidth} />
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
}: {
  params: { slug: string };
}) {
  const posts = await getAllPosts({ includePages: true });
  const post = posts.find((t) => t.slug === slug);

  const blockMap = await getPostBlocks(post.id);

  const emailHash = createHash("md5")
    .update(BLOG.email)
    .digest("hex")
    .trim()
    .toLowerCase();

  return {
    props: { post, blockMap, emailHash },
    revalidate: 1,
  };
}

export default BlogPost;
