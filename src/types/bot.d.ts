import { DiscordClient } from "../classes/Discord";
import { RedditClient } from "../classes/Reddit";

export type BotOptions = {
  discord: DiscordClient;
  reddit: RedditClient;
  env: any;
};

export type DiscordLoginOptions = {
  token: string;
  guildId: string;
  clientId: string;
};
