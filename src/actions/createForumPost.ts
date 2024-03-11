import { log, sys } from "@/log";
import { ForumPost } from "@/types/global";
import {
  displayForumPostBody,
  displayForumPostTitle,
} from "@/helpers/displayForumPost";
import { ForumChannel, ThreadAutoArchiveDuration } from "discord.js";

export async function createForumPost(forum: ForumChannel, post: ForumPost) {
  try {
    return await forum.threads.create({
      name: displayForumPostTitle(post),
      autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
      message: {
        content: displayForumPostBody(post),
      },
    });
  } catch (error: any) {
    log(sys.thread.unknown, error);
  }
}
