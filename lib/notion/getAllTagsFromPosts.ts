import { Post } from "@/types";
import { countBy, filter, flatMap, pipe } from "@fxts/core";

export function getAllTagsFromPosts(posts: Post[]) {
  return pipe(
    posts,
    filter((post) => "tags" in post),
    flatMap((p) => p.tags),
    countBy((p) => p)
  );
}
