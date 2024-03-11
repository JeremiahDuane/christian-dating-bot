export type ForumPost = {
  title: string;
  content: string;
  url: string;
  author: string;
  createdAt: Date;
};

export type SubredditPost = {
  title: string;
  content?: string;
  url?: string;
};
