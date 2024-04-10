import bot from "@/bot";
import { Submission } from "snoowrap";

async function fetchPosts(flair?: string): Promise<Submission[]> {
  const posts = await bot.reddit.subreddit.getNew({ limit: 500 });
  const result: Submission[] = [];
  posts.forEach((post) => {
    if (
      !flair ||
      post?.link_flair_text.toLowerCase() === flair // Check if flair is not excluded
    ) {
      result.push(post);
    }
  });
  return result.length > 50 ? result.slice(0, 50) : result;
}

export { fetchPosts };
