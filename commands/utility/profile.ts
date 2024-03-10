import { SlashCommandBuilder } from 'discord.js';
import config from '@/config.json';
import { discordMentionUser, discordMentionMessage } from '@/helpers/discordMention';
import { DiscordCommandType } from '@/types/discord';

const profileCommand: DiscordCommandType = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Gets a user\'s profile and returns it to you via DM.')
        .setDMPermission(true)
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user whose profile you desire.')
                .setRequired(true)),
    async execute(interaction: any) {
        const target = interaction.options.getUser('user');
        const guild = interaction.guild;
        const channel = await guild.channels.cache.find((channel: any) => channel.name === config.channels.introductions);
        const profiles: any[] = [];
        await channel.threads.cache.forEach((thread: any) => {
            if (thread.ownerId === target.id) profiles.push(thread);
        });
        profiles.sort((a, b) => b._createdTimestamp - a._createdTimestamp);
        const profile = profiles[0];
        const dm = profile && profile.id
            ? `${discordMentionUser(target.id)}'s profile can be read here: ${discordMentionMessage(guild.id, profile.id, profile.id)}`
            : `${discordMentionUser(target.id)} does not have a profile. `;

        await interaction.member.send(dm);
        await interaction.reply("Message sent to your direct mailbox.");
    },
};

export default profileCommand;
