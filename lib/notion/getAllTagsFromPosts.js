export function getAllTagsFromPosts(posts) {
  return posts
    .filter((post) => "tags" in post)
    .flatMap((p) => p.tags)
    .reduce((acc, tag) => {
      if (tag in acc) {
        acc[tag]++;
      } else {
        acc[tag] = 1;
      }

      return acc;
    }, {});
}
