import { log, sys } from "@/log";
import { ForumPost } from "@/types/global";
import { ForumChannel } from "discord.js";

export async function removeExistingPosts(
  forum: ForumChannel,
  posts: ForumPost[]
) {
  try {
    const threads = forum.threads.cache.map((thread) =>
      thread.name.replace(/ /g, "")
    );
    const threadsToCheck =
      threads.length > 50 ? threads.reverse().slice(0, 50) : threads;

    const result = posts.filter((post) => {
      return !threadsToCheck.includes(post.title.replace(/ /g, ""));
    });

    return result;
  } catch (error: any) {
    log(sys.thread.unknown, error);
    return [];
  }
}
