import { useState } from "react";
import BlogPost from "@/components/BlogPost";
import Container from "@/components/Container";
import { Post } from "@/types";
import Pagination from "@/components/Pagination";

const MainLayout = ({
  page,
  postsToShow,
  totalPosts,
}: {
  page: number;
  postsToShow: Post[];
  totalPosts: Post[];
}) => {
  const [searchValue, setSearchValue] = useState("");

  if (searchValue !== "") {
    postsToShow = totalPosts.filter((post) => {
      const tagContent = post.tags ? post.tags.join(" ") : "";
      const searchContent = post.title + post.summary + tagContent;
      return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  return (
    <Container layout={undefined} fullWidth={false}>
      <div className="relative">
        <input
          type="text"
          placeholder="검색하기"
          className="block w-full border px-4 py-2 border-black bg-white text-black dark:bg-night dark:border-white dark:text-white"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <svg
          className="absolute right-3 top-3 h-5 w-5 text-black dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div className="article-container my-8">
        {!postsToShow.length && (
          <p className="text-gray-500 dark:text-gray-300">
            검색 결과가 없습니다.
          </p>
        )}
        {postsToShow.slice(0, 20).map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
      {!searchValue && (
        <Pagination page={page} totalPosts={totalPosts.length} />
      )}
    </Container>
  );
};

export default MainLayout;
