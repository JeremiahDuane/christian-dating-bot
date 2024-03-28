import bot from "@/bot";
import { Submission } from "snoowrap";

async function fetchPosts(flair?: string): Promise<Submission[]> {
  const posts = await bot.reddit.subreddit.getNew({ limit: 100 });
  const result: Submission[] = [];
  posts.forEach((post) => {
    if (
      !flair ||
      post?.link_flair_text.toLowerCase() === flair // Check if flair is not excluded
    ) {
      result.push(post);
    }
  });
  return result;
}

export { fetchPosts };
