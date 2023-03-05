export type Post = {
  id: string;
  date: { start_date: string; end_date?: string };
  type: Array<"Post" | "Page">;
  slug: string;
  tags: string[];
  summary?: string;
  title?: string;
  status?: string;
  createdTime: string;
  fullWidth: boolean;
};
