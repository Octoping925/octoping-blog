import PostLayout from "@/layouts/post";
import { getAllPosts, getPostBlocks } from "@/lib/notion";
import BLOG from "@/blog.config";
import { createHash } from "crypto";
import { Post } from "@/types";
import { ExtendedRecordMap } from "notion-types";
import { pipe, map, filter, uniq, toArray } from "@fxts/core";

const BlogPost = ({
  post,
  blockMap,
  category,
}: {
  post: Post;
  blockMap: ExtendedRecordMap;
  category: string[];
}) => {
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
}: {
  params: { slug: string };
}) {
  const posts = await getAllPosts({ includePages: true });
  const post = posts.find((t) => t.slug === slug);
  const category = pipe(
    posts,
    map((post) => post.category?.[0]),
    filter((category) => category),
    uniq,
    toArray
  );

  const blockMap = await getPostBlocks(post.id);

  const emailHash = createHash("md5")
    .update(BLOG.email)
    .digest("hex")
    .trim()
    .toLowerCase();

  return {
    props: { post, category, blockMap, emailHash },
    revalidate: 1,
  };
}

export default BlogPost;
