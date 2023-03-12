import BLOG from "@/blog.config";
import { useEffect, useState } from "react";

export function usePagination(currentPage: number, totalPage: number) {
  const [pages, setPages] = useState([]);
  const displayPageCnt = BLOG.displayPageOfPagination;

  const grade = Math.floor(currentPage / displayPageCnt);

  const startPage = grade * displayPageCnt + 1;
  const maxPage = Math.floor(totalPage / displayPageCnt);
  const endPage = Math.min(startPage + displayPageCnt - 1, maxPage);

  useEffect(() => {
    setPages([...Array(endPage - startPage + 1)].map((_, i) => startPage + i));
  }, [totalPage, currentPage]);

  const isAbleToGoPrev = currentPage > 1;
  const isAbleToGoNext = currentPage < endPage;

  return { pages, isAbleToGoPrev, isAbleToGoNext };
}
