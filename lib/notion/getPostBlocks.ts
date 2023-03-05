import BLOG from "@/blog.config";
import { NotionAPI } from "notion-client";

export async function getPostBlocks(id: string) {
  const authToken = BLOG.notionAccessToken || null;
  const api = new NotionAPI({ authToken });
  return await api.getPage(id);
}
