import BLOG from "@/blog.config";
import { useEffect, useState } from "react";

export function usePagination(currentPage: number, totalPosts: number) {
  const [pages, setPages] = useState<number[]>([]);
  const displayPageCnt = BLOG.displayPageOfPagination;

  const grade = Math.floor(currentPage / displayPageCnt);

  const startPage = grade * displayPageCnt + 1;
  const maxPage = Math.ceil(totalPosts / BLOG.postsPerPage);
  const endPage = Math.min(startPage + displayPageCnt - 1, maxPage);

  useEffect(() => {
    setPages([...Array(endPage - startPage + 1)].map((_, i) => startPage + i));
  }, [totalPosts, currentPage]);

  const isAbleToGoPrev = currentPage > 1;
  const isAbleToGoNext = currentPage < endPage;

  return { pages, isAbleToGoPrev, isAbleToGoNext };
}
