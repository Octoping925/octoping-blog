import { Post } from "@/types";
import { useEffect, useState } from "react";

export function usePostSearch(posts: Post[], searchValue: string) {
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  useEffect(() => {
    const searchResult = searchAlgorithm(posts, searchValue);
    setSearchResults(searchResult);
  }, [posts, searchValue]);

  function searchAlgorithm(posts: Post[], searchValue: string) {
    return posts.filter((post) => {
      const tagContent = post.tags ? post.tags.join(" ") : "";
      const searchContent = post.title + post.summary + tagContent;
      return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  return searchResults;
}
