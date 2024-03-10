import { ForumPost } from "@/types/global";

export function displayForumPost(post: ForumPost): string {
  return `**${post.title}**
${post.content}

Source: ${post.url}`;
}
