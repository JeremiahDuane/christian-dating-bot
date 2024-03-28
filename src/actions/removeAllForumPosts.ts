import { log, sys } from "@/log";
import { ForumChannel } from "discord.js";

export async function removeAllForumPosts(forum: ForumChannel) {
  try {
    let count = 0;
    const g = await forum.threads.fetch();

    g.threads.forEach(async (thread) => {
      await thread.delete();
      count++;
    });
    return count;
  } catch (error: any) {
    log(sys.thread.unknown, error);
  }
}
