import { createForumPost } from "@/actions/createForumPost";
import bot from "@/bot";
import { parseRedditSubmission } from "@/helpers/parseRedditSubmission";
import { fetchPosts } from "@/gateways/reddit/fetchPosts";
import { log } from "console";
import config from "@/config.json";
import { ForumChannel } from "discord.js";

export async function handleRedditFeed() {
  try {
    const redditPosts = await fetchPosts();
    const forum = (await bot.discord.channels.fetch(
      config.channels.redditDiscussion
    )) as ForumChannel;

    redditPosts.forEach((redditPost) => {
      const post = parseRedditSubmission(redditPost);
      createForumPost(forum, post);
    });
  } catch (error) {
    log("Error fetching or processing Reddit posts", error);
  }
}
