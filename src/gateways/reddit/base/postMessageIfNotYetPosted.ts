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
    if (!messageAlreadyPosted) {
      monthLastPosted = thisMonth;

      bot.reddit.getSubreddit(config.reddit.subreddit).submitSelfpost({
        title: message.title,
        text: message.content,
        subredditName: config.reddit.subreddit,
        flairId: config.reddit.flair.meta,
      });
    }
  } catch (error) {
    log("Error submitting selfpost:", error);
  }
}
