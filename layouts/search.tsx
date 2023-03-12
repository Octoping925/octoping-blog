import { useState } from "react";
import BlogPost from "@/components/BlogPost";
import Container from "@/components/Container";
import Tags from "@/components/Tags";
import { Post } from "@/types";
import Searchbar from "@/components/Searchbar";

const SearchLayout = ({
  tags,
  posts,
  currentTag,
}: {
  tags: { [tag: string]: number };
  posts: Post[];
  currentTag?: string;
}) => {
  const [searchValue, setSearchValue] = useState("");
  let filteredBlogPosts = [];

  if (posts) {
    filteredBlogPosts = posts.filter((post) => {
      const tagContent = post.tags ? post.tags.join(" ") : "";
      const searchContent = post.title + post.summary + tagContent;
      return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  return (
    <Container layout={undefined} fullWidth={false}>
      <Searchbar setSearchValue={setSearchValue} />
      <Tags tags={tags} currentTag={currentTag} />
      <div className="article-container my-8">
        {!filteredBlogPosts.length && (
          <p className="text-gray-500 dark:text-gray-300">
            검색 결과가 없습니다.
          </p>
        )}
        {filteredBlogPosts.slice(0, 20).map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </Container>
  );
};

export default SearchLayout;
