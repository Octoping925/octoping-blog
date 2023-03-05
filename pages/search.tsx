import { getAllPosts, getAllTagsFromPosts } from "@/lib/notion";
import SearchLayout from "@/layouts/search";
import { Post } from "@/types";

export default function search({
  tags,
  posts,
}: {
  tags: { [tag: string]: number };
  posts: Post[];
}) {
  return <SearchLayout tags={tags} posts={posts} />;
}

export async function getStaticProps() {
  const posts = await getAllPosts({ includePages: false });
  const tags = getAllTagsFromPosts(posts);

  return {
    props: {
      tags,
      posts,
    },
    revalidate: 1,
  };
}
