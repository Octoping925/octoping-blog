export type Post = {
  id: string;
  date: { start_date: string; end_date?: string };
  category: [string];
  type: ["Post" | "Page"];
  slug: string;
  tags?: string[];
  summary?: string;
  title?: string;
  status?: [string];
  createdTime: string;
  fullWidth: boolean;
};
