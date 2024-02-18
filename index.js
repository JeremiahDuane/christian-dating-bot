const { Events } = require('discord.js');
const { handleFeeds } = require('./handlers/handleFeeds');
const { handleCursesInMessages, handleCursesInThreads } = require('./handlers/handleCurses');
const { log } = require('./helpers/logger');
const { bot } = require('./bot');
const { handleAddIntroducedRole } = require('./handlers/handleAddIntroducedRole');
const { handleRemovedIntroducedRole } = require('./handlers/handleRemoveIntroducedRole');
require('dotenv').config()

const { CLIENT_ID: clientId, GUILD_ID: guildId, DISCORD_TOKEN: token } = process.env

bot.once(Events.ClientReady, readyClient => {
	log(`-------------------------------------------`);
	log(`Ready! Logged in as ${readyClient.user.tag}`);
});

bot.on(Events.MessageCreate, async (message) => {
	handleFeeds(message)
	// Ignore messages from bots
	if (message.author.bot) return;
	handleCursesInMessages(message)
})

bot.on(Events.ThreadCreate, async (thread) => {
	handleCursesInThreads(thread)
	handleAddIntroducedRole(thread)
})

bot.on(Events.ThreadDelete, async (thread) => {
	handleRemovedIntroducedRole(thread)
})

bot.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		log(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		log('There was an error while executing a command.', error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

bot.login(token);