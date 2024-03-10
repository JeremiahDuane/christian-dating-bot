import { log, sys } from "@/log";
import { ForumPost } from "@/types/global";
import { displayForumPost } from "@/helpers/displayForumPost";
import { ForumChannel, ThreadAutoArchiveDuration } from "discord.js";

export async function createForumPost(forum: ForumChannel, post: ForumPost) {
  try {
    return await forum.threads.create({
      name: post.title,
      autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
      message: {
        content: displayForumPost(post),
      },
    });
  } catch (error: any) {
    log(sys.thread.unknown, error);
  }
}
