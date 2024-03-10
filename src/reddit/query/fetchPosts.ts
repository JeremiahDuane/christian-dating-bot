import bot from '@/bot';
import { Submission } from 'snoowrap';
import config from '@/config.json';

const postQueue: Set<string> = new Set();

async function fetchPosts(): Promise<Submission[]> {
  const isEmpty = postQueue.size === 0;
  const limit = isEmpty ? 1 : 100;
  const posts = await bot.reddit.getSubreddit(config.reddit.subreddit).getNew({ limit });

  const result: Submission[] = [];
  for (const post of posts) {
    if (
      (isEmpty || !postQueue.has(post.id)) && // Check if post ID is not in the queue
      (post?.link_flair_text !== config.reddit.excludedFlair) // Check if flair is not excluded
    ) {
      result.push(post);
      postQueue.add(post.id);
    } break
  }
  return result;
}

export { fetchPosts };