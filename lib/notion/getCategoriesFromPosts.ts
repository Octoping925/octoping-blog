import { Post } from "@/types";
import { pipe, map, filter, uniq, toArray } from "@fxts/core";

export function getCategoriesFromPosts(posts: Post[]) {
  return pipe(
    posts,
    map((post) => post.category?.[0]),
    filter((category) => category),
    uniq,
    toArray
  );
}
