import { useState } from "react";
import BlogPost from "@/components/BlogPost";
import Container from "@/components/Container";
import { Post } from "@/types";
import Pagination from "@/components/Pagination";
import Searchbar from "@/components/Searchbar";
import Category from "@/components/Category";
import { usePostSearch } from "@/hooks/usePostSearch";
import CategorySidebar from "@/components/CategorySidebar";

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

  const searchResult = usePostSearch(totalPosts, searchValue);

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
              {searchValue !== "" &&
                (postsToShow.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-300">
                    검색 결과가 없습니다.
                  </p>
                ) : (
                  searchResult
                    .slice(0, 20)
                    .map((post) => <BlogPost key={post.id} post={post} />)
                ))}
              {searchValue === "" &&
                postsToShow.map((post) => (
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
      <CategorySidebar
        categoryVisibility={categoryVisibility}
        setCategoryVisibility={setCategoryVisibility}
        category={category}
      />
    </>
  );
};

export default MainLayout;
