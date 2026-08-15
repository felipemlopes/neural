export type Category = {
  id: number;
  parent_id: number | null;
  name: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  active: boolean;
  order: number;
  children?: Category[];
};

export type Project = {
  id: number;
  market: "forex" | "crypto";
  category_id: number | null;
  index: string;
  title: string;
  slug: string | null;
  description: string;
  cover_image: string | null;
  cta: string;
  target: string;
  external_url: string | null;
  active: boolean;
  order: number;
  category?: Category | null;
  lessons?: Lesson[];
  media?: Media[];
};

export type Lesson = {
  id: number;
  category_id: number | null;
  project_id: number | null;
  title: string;
  slug: string;
  summary: string | null;
  body: string | null;
  video_url: string | null;
  active: boolean;
  order: number;
  category?: Category | null;
  project?: Project | null;
  media?: Media[];
};

export type Media = {
  id: number;
  mediable_type: string;
  mediable_id: number;
  type: "image" | "pdf" | "video" | "link";
  title: string | null;
  file_path: string | null;
  external_url: string | null;
  order: number;
  file_url: string | null;
};

export type CommunityLink = {
  id: number;
  label: string;
  url: string;
  type: "telegram" | "whatsapp" | "other";
  active: boolean;
  order: number;
};
