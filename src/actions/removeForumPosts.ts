import { log, sys } from "@/log";
import { ForumChannel, ThreadChannel } from "discord.js";

export async function removeForumPosts(
  forum: ForumChannel,
  threads: ThreadChannel[]
) {
  try {
    threads.forEach((thread) => {
      thread.delete();
    });
    return threads.length;
  } catch (error: any) {
    log(sys.thread.unknown, error);
  }
}
