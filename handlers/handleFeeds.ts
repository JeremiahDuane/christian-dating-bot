import { ThreadAutoArchiveDuration, GuildChannel } from 'discord.js';
import { handles } from '@/config.json';
import { log, sys } from '@/log';

function parseSubstringBetweenDoubleAsterisks(text: string): string {
    const startIndex = text.indexOf('**');
    const endIndex = text.lastIndexOf('**');

    if (startIndex !== -1 && endIndex !== -1 && startIndex !== endIndex) {
        return text.substring(startIndex + 2, endIndex);
    } else {
        return text;
    }
}

function handleFeeds(message: any): void {
    const { inputSuffix, outputSuffix } = handles;
    const outputChannels = message.guild.channels.cache.filter((channel: GuildChannel) => channel.name.includes(outputSuffix));
    const inputChannels = message.guild.channels.cache.filter((channel: GuildChannel) => channel.name.includes(inputSuffix));

    inputChannels.forEach(input => {
        if (message.channel.id === input.id) {
            outputChannels.forEach(output => {
                if (output.name.replace(outputSuffix, "") === input.name.replace(inputSuffix, "")) {
                    createForumPost(output.name.replace(outputSuffix, ""), output, message);
                }
            });
        }
    });
}

function createForumPost(topic: string, forum: any, message: any): void {
    const embed = message?.embeds?.[0];
    const trimContent = (content: string) => content.length > 90 ? `${content.substring(0, 87)}...` : content;

    let title;
    let content;

    if (embed) {
        title = trimContent(parseSubstringBetweenDoubleAsterisks(embed.description));
        content = `${embed.description}\n\n${embed?.url ? 'Source: ' + embed?.url : ''}`;
    } else {
        title = trimContent(parseSubstringBetweenDoubleAsterisks(message.content));
        content = message.content;
    }

    forum.threads
        .create({
            name: `${topic.toUpperCase()}: ${title}`,
            autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
            message: {
                content: content
            },
        })
        .catch(error => log(sys.thread.unknown, error));
}

export { handleFeeds };
