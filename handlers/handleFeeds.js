const { handles } = require('../config.json')

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
		title = trimContent(embed.description).replace("*", "")
		content = `${embed.description}\n\n${embed?.url ? 'Source: ' + embed?.url : ''}`
	} else {
		title = trimContent(message.content).replace("*", "")
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
		.catch(console.error);
}

module.exports = { handleFeeds }