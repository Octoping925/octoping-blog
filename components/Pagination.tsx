import Link from "next/link";
import BLOG from "@/blog.config";
import { useLocale } from "@/lib/locale";

const Pagination = ({
  page,
  showNext,
}: {
  page: number;
  showNext: boolean;
}) => {
  const locale = useLocale();

  const currentPage = +page;
  let additionalClassName = "justify-between";

  if (currentPage === 1 && showNext) additionalClassName = "justify-end";
  if (currentPage !== 1 && !showNext) additionalClassName = "justify-start";

  return (
    <div
      className={`flex font-medium text-black dark:text-gray-100 ${additionalClassName}`}
    >
      {currentPage !== 1 && (
        <Link
          href={
            currentPage - 1 === 1
              ? `${BLOG.path || "/"}`
              : `/page/${currentPage - 1}`
          }
        >
          <a>
            <button id="prev" className="block cursor-pointer">
              ← {locale.PAGINATION.PREV}
            </button>
          </a>
        </Link>
      )}
      {showNext && (
        <Link href={`/page/${currentPage + 1}`}>
          <a>
            <button id="next" className="block cursor-pointer">
              {locale.PAGINATION.NEXT} →
            </button>
          </a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
