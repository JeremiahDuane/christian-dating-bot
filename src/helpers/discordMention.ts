export const discordMentionUser = (text: string): string => `<@${text}>`;
export const discordMentionMessage = (guild: string, channel: string, message: string): string =>
  `https://discord.com/channels/${guild}/${channel}/${message}`;
