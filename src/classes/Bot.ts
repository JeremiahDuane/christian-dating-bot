import { DiscordClient } from "@/classes/Discord";
import { RedditClient } from "@/classes/Reddit";
import { BotOptions } from "@/types/bot";

export class Bot {
  discord: DiscordClient;
  reddit: RedditClient;
  env: any;
  constructor(options?: BotOptions) {
    if (!options) return;
    this.discord = options.discord;
    this.reddit = options.reddit;
    this.env = options.env;
  }
}
