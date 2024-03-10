import { REST } from 'discord.js';
import dotenv from 'dotenv';
import { log } from '@/log';
import { commands } from '@/commands';
dotenv.config();

const { DISCORD_CLIENT_ID: clientId, DISCORD_GUILD_ID: guildId, DISCORD_TOKEN: token } = process.env;

export async function deployCommands() {
    if (!token) return;
    const rest = new REST({ version: '9' }).setToken(token);

    try {
        log(`Started refreshing ${[...commands].length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            `/applications/${clientId}/guilds/${guildId}/commands`,
            { body: commands },
        ) as Array<String>;

        log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        log("Failed in deploy-commands.ts", error);
    }
}