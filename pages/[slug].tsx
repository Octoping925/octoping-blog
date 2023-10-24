import PostLayout from "@/layouts/post";
import { getAllPosts, getPostBlocks } from "@/lib/notion";
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import { getCategoriesFromPosts } from "@/lib/notion/getCategoriesFromPosts";

// export async function getStaticPaths() {
//   const posts = await getAllPosts({ includePages: true });
//   const paths = posts.map((post) => ({ params: { slug: post.slug } }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params }: GetStaticPropsContext) {
//   const posts = await getAllPosts({ includePages: true });
//   const category = getCategoriesFromPosts(posts);

//   const post = posts.find((t) => t.slug === params.slug);
//   const blockMap = await getPostBlocks(post.id);

//   return {
//     props: { post, category, blockMap },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const posts = await getAllPosts({ includePages: true });
  const category = getCategoriesFromPosts(posts);

  const post = posts.find((t) => t.slug === params.slug);
  const blockMap = await getPostBlocks(post.id);

  return {
    props: { post, category, blockMap },
  };
}

const BlogPost = ({
  post,
  blockMap,
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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

export default BlogPost;
