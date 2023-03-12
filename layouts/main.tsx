import { useState } from "react";
import BlogPost from "@/components/BlogPost";
import Container from "@/components/Container";
import { Post } from "@/types";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import Searchbar from "@/components/Searchbar";

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

  if (searchValue !== "") {
    postsToShow = totalPosts.filter((post) => {
      const tagContent = post.tags ? post.tags.join(" ") : "";
      const searchContent = post.title + post.summary + tagContent;
      return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  return (
    <Container layout={undefined} fullWidth={false}>
      <div className="flex justify-center">
        <aside className="max-w-sm">
          <table className="mt-2 mr-10 mb-4">
            <thead className="lg:block text-xl p-1 mb-3 dark:text-white">
              Category
            </thead>
            <tbody>
              <tr className="flex text-m p-1 px-4 my-1 flex-shrink-0 rounded-xl text-gray-500 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 dark:hover:text-gray-500  false">
                <Link href="/">
                  <a>All</a>
                </Link>
              </tr>
              {category.map((category) => (
                <tr
                  key={category}
                  className="flex text-m p-1 px-4 my-1 flex-shrink-0 rounded-xl text-gray-500 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 dark:hover:text-gray-500  false"
                >
                  <Link href={`?category=${category}`}>
                    <a>{category}</a>
                  </Link>
                </tr>
              ))}
            </tbody>
          </table>
        </aside>
        <div
          className="main max-w-4xl"
          style={{
            minWidth: "650px",
          }}
        >
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
        <div className="w-32"></div>
      </div>
    </Container>
  );
};

export default MainLayout;
