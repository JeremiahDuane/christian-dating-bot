import bot from "@/bot";
import config from "@/config.json";
import { Submission } from "snoowrap";

export async function fetchPostsInRange(
  startDate: Date,
  endDate: Date,
  flair?: string
): Promise<Submission[]> {
  // Perform the Reddit search with the constructed query
  const searchResults = await bot.reddit.subreddit.getNew({
    limit: 100,
  });

  // Return the array of submissions from the search results
  let filtered = searchResults.filter(
    (post) =>
      post.created * 1000 > startDate.getTime() &&
      post.created * 1000 < endDate.getTime()
  );

  if (flair) {
    filtered.filter((post) => post.link_flair_text.toLowerCase() === flair);
  }

  return filtered;
}
