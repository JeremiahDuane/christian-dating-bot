import { RedditFlair } from "@/types/reddit";
import Snoowrap, { Subreddit } from "snoowrap";

export class RedditClient extends Snoowrap {
  subreddit: Subreddit;
  flair: RedditFlair;
  constructor(
    options?: Snoowrap.SnoowrapOptions,
    flair?: RedditFlair,
    subreddit?: string
  ) {
    super(options);
    this.flair = flair;
    this.subreddit = this.getSubreddit(subreddit);
  }
}
