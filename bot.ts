import { GatewayIntentBits } from 'discord.js';
import { DiscordClient } from '@/classes/Discord';
import { commands } from '@/commands';
import { Bot } from '@/classes/Bot';
import { RedditClient } from '@/classes/Reddit';
import { SnoowrapOptions } from 'snoowrap';

const { DISCORD_CLIENT_ID, DISCORD_GUILD_ID, DISCORD_TOKEN, REDDIT_USER_AGENT, REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_USERNAME, REDDIT_PASSWORD } = process.env;

const discordLoginOptions = {
    clientId: DISCORD_CLIENT_ID,
    guildId: DISCORD_GUILD_ID,
    token: DISCORD_TOKEN,    
}

const redditLoginOptions: SnoowrapOptions = {
    userAgent: REDDIT_USER_AGENT,
    clientId: REDDIT_CLIENT_ID,
    clientSecret: REDDIT_CLIENT_SECRET,
    username: REDDIT_USERNAME,
    password: REDDIT_PASSWORD
}

const discordOptions = { 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
}

export default new Bot(
    {
        discord: new DiscordClient(discordOptions, discordLoginOptions, commands),
        reddit: new RedditClient(redditLoginOptions)
    }
)
