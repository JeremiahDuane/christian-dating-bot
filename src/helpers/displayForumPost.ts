import { ForumPost } from "@/types/global";

export function displayForumPostTitle(post: ForumPost): string {
  const { title, content, url } = post;

  if (title.length > 95) {
    return title + "...";
  }
  return title;
}

export function displayForumPostBody(post: ForumPost): string {
  const { title, content, url } = post;

  const text = (t: string, c: string, u: string) =>
    `**${t}**\n${c}\n\nSource: ${u}`;

  if (text(title, content, url).length > 1600) {
    return text(title, content.substring(0, 1600) + "...", url);
  } else return text(title, content, url);
}

export function displayForumPost(post: ForumPost): ForumPost {
  return {
    title: displayForumPostTitle(post),
    content: displayForumPostBody(post),
  } as ForumPost;
}
