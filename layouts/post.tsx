import Container from "@/components/Container";
import TagItem from "@/components/TagItem";
import {
  NotionRenderer,
  Equation,
  Code,
  Collection,
  CollectionRow,
} from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";
import BLOG from "@/blog.config";
import formatDate from "@/lib/formatDate";
import { useLocale } from "@/lib/locale";
import { useRouter } from "next/router";
import Comments from "@/components/Comments";
import { Post } from "@/types";
import CategorySidebar from "@/components/CategorySidebar";
import { useState } from "react";

const mapPageUrl = (id: string) => {
  return "https://www.notion.so/" + id.replace(/-/g, "");
};

const PostLayout = ({
  children,
  blockMap,
  frontMatter,
  fullWidth = false,
  category,
}: {
  children?: React.ReactNode;
  blockMap?: ExtendedRecordMap;
  frontMatter: Post;
  fullWidth?: boolean;
  category: string[];
}) => {
  const locale = useLocale();
  const router = useRouter();
  const [categoryVisibility, setCategoryVisibility] = useState(false);

  return (
    <>
      <Container
        layout="blog"
        title={frontMatter.title}
        description={frontMatter.summary}
        // date={new Date(frontMatter.publishedAt).toISOString()}
        type="article"
        fullWidth={fullWidth}
        openCategory={() => setCategoryVisibility(true)}
      >
        <article>
          <h1 className="font-bold text-4xl sm:text-6xl bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            {frontMatter.title}
          </h1>
          {frontMatter.type[0] !== "Page" && (
            <nav className="flex mt-7 items-start text-gray-500 dark:text-gray-400">
              <div className="mr-2 mb-4 md:ml-0">
                {formatDate(
                  frontMatter?.date?.start_date || frontMatter.createdTime,
                  BLOG.lang
                )}
              </div>
              {frontMatter.tags && (
                <div className="flex flex-nowrap max-w-full overflow-x-auto article-tags">
                  {frontMatter.tags.map((tag) => (
                    <TagItem key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </nav>
          )}
          {children}
          {blockMap && (
            <div className="-mt-4">
              <NotionRenderer
                recordMap={blockMap}
                components={{
                  equation: Equation,
                  code: Code,
                  collection: Collection,
                  collectionRow: CollectionRow,
                }}
                mapPageUrl={mapPageUrl}
              />
            </div>
          )}
        </article>
        <div className="flex justify-between font-medium text-gray-500 dark:text-gray-400">
          <a>
            <button
              onClick={() => router.push(BLOG.path || "/")}
              className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
            >
              ← {locale.POST.BACK}
            </button>
          </a>
          <a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-2 cursor-pointer hover:text-black dark:hover:text-gray-100"
            >
              ↑ {locale.POST.TOP}
            </button>
          </a>
        </div>
        <Comments />
      </Container>
      <CategorySidebar
        categoryVisibility={categoryVisibility}
        setCategoryVisibility={setCategoryVisibility}
        category={category}
      />
    </>
  );
};

export default PostLayout;
