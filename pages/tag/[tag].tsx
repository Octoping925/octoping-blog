import { getAllPosts, getAllTagsFromPosts } from "@/lib/notion";
import SearchLayout from "@/layouts/search";
import { pipe, map, filter, uniq, toArray } from "@fxts/core";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";

export default function Tag({
  tags,
  posts,
  currentTag,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <SearchLayout
      tags={tags}
      posts={posts}
      currentTag={currentTag}
      category={category}
    />
  );
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const currentTag = params.tag as string;
  const posts = await getAllPosts({ includePages: false });
  const tags = getAllTagsFromPosts(posts);

  const category = pipe(
    posts,
    map((post) => post.category?.[0]),
    filter((category) => category),
    uniq,
    toArray
  );

  const filteredPosts = posts.filter(
    (post) => post && post.tags && post.tags.includes(currentTag)
  );

  return {
    props: {
      tags,
      posts: filteredPosts,
      currentTag,
      category,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts({ includePages: false });
  const tags = getAllTagsFromPosts(posts);

  return {
    paths: Object.keys(tags).map((tag) => ({ params: { tag } })),
    fallback: true,
  };
}
