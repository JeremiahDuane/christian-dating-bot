const config = require('../config.json');
const { log } = require('../helpers/logger');

async function handleAddIntroducedRole(thread) {
	const guild = thread.guild
	const author = await guild.members.fetch(thread.ownerId)
	const introductions = await guild.channels.cache.find(channel => channel.name === config.channels.introductions);
	const roleIntroduced = guild.roles.cache.find(role => role.id === config.roles.introduced);
	const roleUnintroduced = guild.roles.cache.find(role => role.id === config.roles.unintroduced);
	
	if (introductions.id === thread.parentId && roleIntroduced && roleUnintroduced) {
		author.roles.add(roleIntroduced);
		author.roles.remove(roleUnintroduced);
		log("roleUnintroduced swapped for roleIntroduced")	
	}
}

module.exports = { handleAddIntroducedRole }