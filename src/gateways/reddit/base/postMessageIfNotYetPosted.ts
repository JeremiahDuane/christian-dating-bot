import bot from "@/bot";
import { fetchPostsFromCurrentMonth } from "../fetchPostsFromCurrentMonth";
import config from "@/config.json";
import { SubredditPost } from "@/types/global";
import { log } from "@/log";

let monthLastPosted;

export async function postMessageIfNotPostedYet(
  message: SubredditPost
): Promise<void> {
  // Check if the message has already been posted in the current month
  // const postsFromCurrentMonth = await fetchPostsFromCurrentMonth();
  // const messageAlreadyPosted = postsFromCurrentMonth.some(
  //   (post) => post.title === message.title
  // );
  const thisMonth = new Date().getMonth();
  const messageAlreadyPosted = monthLastPosted === thisMonth;

  // Submit the selfpost
  try {
    if (!messageAlreadyPosted && !bot.env.DISCORD_ONLY) {
      monthLastPosted = thisMonth;

      bot.reddit.subreddit.submitSelfpost({
        title: message.title,
        text: message.content,
        subredditName: config.reddit.subreddit,
        flairId: bot.reddit.flair.meta,
      });
    }
  } catch (error) {
    log("Error submitting selfpost:", error);
  }
}
