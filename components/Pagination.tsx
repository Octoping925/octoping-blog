import Link from "next/link";
import BLOG from "@/blog.config";
import { useLocale } from "@/lib/locale";
import { usePagination } from "@/hooks/usePagination";

const Pagination = ({
  page,
  totalPosts,
}: {
  page: number;
  totalPosts: number;
}) => {
  const locale = useLocale();
  const { pages, isAbleToGoPrev, isAbleToGoNext } = usePagination(
    page,
    totalPosts
  );

  return (
    <div className="flex font-medium text-black dark:text-gray-100 justify-between">
      <Link href={page - 1 === 1 ? `${BLOG.path || "/"}` : `?page=${page - 1}`}>
        <a className={isAbleToGoPrev ? "" : "invisible"}>
          <button id="prev" className="block cursor-pointer">
            ← {locale.PAGINATION.PREV}
          </button>
        </a>
      </Link>
      <div className="w-44 flex justify-around">
        {pages.map((page) => (
          <Link
            key={page}
            href={page === 1 ? `${BLOG.path || "/"}` : `?page=${page}`}
          >
            {page}
          </Link>
        ))}
      </div>
      <Link href={`?page=${page + 1}`}>
        <a className={isAbleToGoNext ? "" : "invisible"}>
          <button id="next" className="block cursor-pointer">
            {locale.PAGINATION.NEXT} →
          </button>
        </a>
      </Link>
    </div>
  );
};

export default Pagination;
