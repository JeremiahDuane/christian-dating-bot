const { ThreadAutoArchiveDuration } = require('discord.js');
const { handles } = require('../config.json');
const { log, sys } = require('../helpers/logger');

function handleFeeds(message) {
	const { inputSuffix, outputSuffix } = handles
	let outputChannels = message.guild.channels.cache.filter(channel => channel.name.includes(outputSuffix));
	let inputChannels = message.guild.channels.cache.filter(channel => channel.name.includes(inputSuffix));
	inputChannels.forEach(input => {		
		if (message.channel.id === input.id) {
			  outputChannels.forEach(output => {		
				if (output.name.replace(outputSuffix, "") === input.name.replace(inputSuffix, "")) {
					createForumPost(output.name.replace(outputSuffix, ""), output, message)
				}
			});
		}
	});
}
function createForumPost(topic, forum, message) {
	const embed = message?.embeds?.[0]
	const trimContent = (content) =>  content.length > 90 ? `${content.substring(0,87)}...` : content

	let title;
	let content;

	if (embed) {
		title = parseSubstringBetweenDoubleAsterisks(trimContent(message.content))
		content = `${embed.description}\n\n${embed?.url ? 'Source: ' + embed?.url : ''}`
	} else {
		title = parseSubstringBetweenDoubleAsterisks(trimContent(message.content))
		content = message.content
	}

	forum.threads
		.create({
			name: `${topic.toUpperCase()}: ${title}`,
			autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
			message: {
				content: content
			},
		})
		.catch(error => log(sys.message.thread.unknown, error));
}
function parseSubstringBetweenDoubleAsterisks(text) {
    const startIndex = text.indexOf('**');
    const endIndex = text.lastIndexOf('**');

    if (startIndex !== -1 && endIndex !== -1 && startIndex !== endIndex) {
        return text.substring(startIndex + 2, endIndex);
    } else {
		return text;
	}
}

module.exports = { handleFeeds }