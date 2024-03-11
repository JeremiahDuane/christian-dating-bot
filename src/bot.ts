import { GatewayIntentBits } from "discord.js";
import { DiscordClient } from "@/classes/Discord";
import { commands } from "@/commands";
import { Bot } from "@/classes/Bot";
import { RedditClient } from "@/classes/Reddit";
import { SnoowrapOptions } from "snoowrap";
import { configDotenv } from "dotenv";
import { RedditFlair } from "./types/reddit";

configDotenv();

const {
  DISCORD_CLIENT_ID,
  DISCORD_GUILD_ID,
  DISCORD_TOKEN,
  REDDIT_USER_AGENT,
  REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET,
  REDDIT_USERNAME,
  REDDIT_PASSWORD,
  REDDIT_SUBREDDIT,
  REDDIT_FLAIR_META,
  REDDIT_FLAIR_INTRODUCTION,
  REDDIT_FLAIR_NEEDADVICE,
  REDDIT_FLAIR_DISCUSSION,
} = process.env;

const discordLoginOptions = {
  clientId: DISCORD_CLIENT_ID,
  guildId: DISCORD_GUILD_ID,
  token: DISCORD_TOKEN,
};

const redditLoginOptions: SnoowrapOptions = {
  userAgent: REDDIT_USER_AGENT,
  clientId: REDDIT_CLIENT_ID,
  clientSecret: REDDIT_CLIENT_SECRET,
  username: REDDIT_USERNAME,
  password: REDDIT_PASSWORD,
};

const redditFlair: RedditFlair = {
  meta: REDDIT_FLAIR_META,
  introduction: REDDIT_FLAIR_INTRODUCTION,
  needAdvice: REDDIT_FLAIR_NEEDADVICE,
  discussion: REDDIT_FLAIR_DISCUSSION,
};

const discordOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
};

const bot = new Bot({
  discord: new DiscordClient(
    discordOptions,
    discordLoginOptions,
    commands,
    DISCORD_GUILD_ID
  ),
  reddit: new RedditClient(redditLoginOptions, redditFlair, REDDIT_SUBREDDIT),
  env: process.env,
});

export default bot;
