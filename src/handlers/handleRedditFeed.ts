import { createForumPost } from "@/actions/createForumPost";
import bot from "@/bot";
import { parseRedditSubmissions } from "@/helpers/parseRedditSubmission";
import { fetchPosts } from "@/gateways/reddit/fetchPosts";
import { log } from "@/log";
import config from "@/config.json";
import { ForumChannel } from "discord.js";
import { removeExistingPosts } from "@/actions/removeExistingPosts";
import { removeRemovalPosts } from "@/actions/removeRemovalPosts";

export async function handleRedditFeed() {
  try {
    const redditPosts = await fetchPosts(config.reddit.flair.discussion.text);
    const forum = bot.discord
      .guild()
      .channels.cache.find(
        (channel: any) => channel.name === config.channels.redditDiscussion
      ) as ForumChannel;

    const posts = parseRedditSubmissions(redditPosts);
    await removeRemovalPosts(forum, [...posts]);
    const postsFilteredOutExisting = await removeExistingPosts(forum, [
      ...posts,
    ]);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const postsFilteredOutPast = postsFilteredOutExisting.filter(
      (p) => p.createdAt >= yesterday
    );
    postsFilteredOutPast.reverse().forEach((post) => {
      createForumPost(forum, post);
    });
  } catch (error) {
    log("Error fetching or processing Reddit posts", error);
  }
}
