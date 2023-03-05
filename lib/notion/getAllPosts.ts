import BLOG from "@/blog.config";
import { NotionAPI } from "notion-client";
import { idToUuid } from "notion-utils";
import getAllPageIds from "./getAllPageIds";
import getPageProperties from "./getPageProperties";
import filterPublishedPosts from "./filterPublishedPosts";
import { map, pipe, toArray, toAsync } from "@fxts/core";
import { Post } from "@/types";

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */
export async function getAllPosts({
  includePages = false,
}: {
  includePages?: boolean;
}) {
  const id = BLOG.notionPageId;
  const authToken = BLOG.notionAccessToken || null;
  const api = new NotionAPI({ authToken });
  const response = await api.getPage(id);

  const uuid = idToUuid(id);
  const collection = Object.values(response.collection)[0]?.value;
  const collectionQuery = response.collection_query;
  const block = response.block;
  const schema = collection?.schema;

  const rawMetadata = block[uuid].value;

  // Check Type
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    console.log(`pageId "${uuid}" is not a database`);
    return null;
  }

  // Construct Data
  const pageIds = getAllPageIds(collectionQuery);

  const pageProperties = await pipe(
    pageIds,
    toAsync,
    map(async (id) => {
      return {
        ...(await getPageProperties(id, block, schema)),
        createdTime: new Date(block[id].value?.created_time).toString(),
        // @ts-ignore
        fullWidth: block[id].value?.format?.page_full_width ?? false,
      } as Post;
    }),
    toArray
  );

  // remove all the the items doesn't meet requirements
  const posts: Post[] = filterPublishedPosts({
    posts: pageProperties,
    includePages,
  });

  // Sort by date
  if (BLOG.sortByDate) {
    posts.sort((a, b) => {
      const dateA = new Date(a?.date?.start_date || a.createdTime);
      const dateB = new Date(b?.date?.start_date || b.createdTime);
      return dateA > dateB ? -1 : 1;
    });
  }

  return posts;
}
