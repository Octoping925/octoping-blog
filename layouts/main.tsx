import { useState } from "react";
import BlogPost from "@/components/BlogPost";
import Container from "@/components/Container";
import { Post } from "@/types";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import Searchbar from "@/components/Searchbar";
import Category from "@/components/Category";
import { usePostSearch } from "@/hooks/usePostSearch";

const MainLayout = ({
  page,
  postsToShow,
  totalPosts,
  category,
}: {
  page: number;
  postsToShow: Post[];
  totalPosts: Post[];
  category: string[];
}) => {
  const [searchValue, setSearchValue] = useState("");
  postsToShow = usePostSearch(totalPosts, searchValue);

  return (
    <Container layout={undefined} fullWidth={false}>
      <div className="flex justify-center">
        <aside className="max-w-sm hidden md:block">
          <Category category={category} />
        </aside>
        <div className="main max-w-4xl md:min-w-650">
          <Searchbar setSearchValue={setSearchValue} />
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
        </div>
        <div className="hidden md:block w-32"></div>
      </div>
    </Container>
  );
};

export default MainLayout;
