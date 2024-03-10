import { SlashCommandBuilder } from 'discord.js';
import { DiscordCommandType } from '@/types/discord';

const pingCommand: DiscordCommandType = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: any) {
        await interaction.reply('Pong!');
    },
};

export default pingCommand;
