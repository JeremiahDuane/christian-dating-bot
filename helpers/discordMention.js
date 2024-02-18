module.exports = {
    discordMentionUser: (text) => `<@${text}>`,
    discordMentionMessage: (guild, channel, message) => `https://discord.com/channels/${guild}/${channel}/${message}`
}