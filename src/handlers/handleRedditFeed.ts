import { createForumPost } from "@/actions/createForumPost";
import bot from "@/bot";
import { parseRedditSubmissions } from "@/helpers/parseRedditSubmission";
import { fetchPosts } from "@/gateways/reddit/fetchPosts";
import { log } from "@/log";
import config from "@/config.json";
import { ForumChannel } from "discord.js";
import { removeExistingPosts } from "@/actions/removeExistingPosts";

export async function handleRedditFeed() {
  try {
    const redditPosts = await fetchPosts();
    const forum = bot.discord
      .guild()
      .channels.cache.find(
        (channel: any) => channel.name === config.channels.redditDiscussion
      ) as ForumChannel;

    const posts = parseRedditSubmissions(redditPosts);

    const filteredPosts = await removeExistingPosts(forum, posts);

    filteredPosts.forEach((post) => {
      createForumPost(forum, post);
    });
  } catch (error) {
    log("Error fetching or processing Reddit posts", error);
  }
}
