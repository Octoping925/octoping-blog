import { useState } from "react";
import BlogPost from "@/components/BlogPost";
import Container from "@/components/Container";
import { Post } from "@/types";
import Pagination from "@/components/Pagination";
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
  const [categoryVisibility, setCategoryVisibility] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  if (searchValue !== "") {
    postsToShow = usePostSearch(totalPosts, searchValue);
  }

  return (
    <>
      <Container
        layout={undefined}
        fullWidth={false}
        openCategory={() => setCategoryVisibility(true)}
      >
        <div className="flex justify-center">
          <aside className="max-w-md hidden md:block">
            <Category category={category} />
          </aside>
          <div className="main w-full max-w-4xl md:min-w-650">
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
      {categoryVisibility && (
        <div
          className="category block md:hidden absolute top-0 left-0 w-full h-full z-10"
          style={{
            backgroundColor: "rgba(55, 65, 81, 0.5)",
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setCategoryVisibility(false);
            }
          }}
        >
          <aside
            className="categoryBody flex justify-center absolute left-1/2 w-1/2 h-full pt-10 bg-day dark:bg-gray-700"
            onClick={(event) => {
              if (event.target !== event.currentTarget) {
                setCategoryVisibility(false);
              }
            }}
          >
            <div className="h-28">
              <Category category={category} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default MainLayout;
