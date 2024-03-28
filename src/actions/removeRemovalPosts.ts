import { log, sys } from "@/log";
import { ForumPost } from "@/types/global";
import { ForumChannel } from "discord.js";
import { removeForumPosts } from "./removeForumPosts";

export async function removeRemovalPosts(
  forum: ForumChannel,
  posts: ForumPost[]
) {
  try {
    const threads = forum.threads.cache.map((thread) => thread);
    const threadsToCheck =
      threads.length > 50 ? threads.reverse().slice(0, 50) : threads;
    const postTitles = posts.map((post) => post.title.replace(/ /g, ""));

    const threadsToRemove = threadsToCheck.filter((post) => {
      return !postTitles.includes(post.name.replace(/ /g, ""));
    });

    return removeForumPosts(forum, threadsToRemove);
  } catch (error: any) {
    log(sys.thread.unknown, error);
    return [];
  }
}
