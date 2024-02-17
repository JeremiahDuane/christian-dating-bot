const { log, sys } = require('../helpers/logger');
const { parseCurses, parseCursesReply, parseCursesMessage } = require('../json/parseCurses');

async function handleCursesInThreads(thread) {
	const content = thread.name.toLowerCase();

	// If the message contains a banned word, delete it
	if (isBanned(content)) {
		try {
			log(sys.thread.deleted.cursing);
			// Reply to the message before deleting it
			const author = await thread.fetchOwner()
			await author.user.send(parseCursesMessage());
			// Delete the thread
			await thread.delete();
		} catch (error) {
			log(sys.thread.deleted.cursing, error);
		}
	}
}

async function handleCursesInMessages(message) {
	const content = message.content.toLowerCase();
	
	// If the message contains a banned word, delete it
	if (isBanned(content)) {
		try {
			log(sys.message.deleted.cursing);
			// Reply to the message before deleting it
			await message.reply(parseCursesReply());
			// Delete the message
			await message.delete();
		} catch (error) {
			log(sys.message.deleted.cursing, error);
		}
	}
}

async function isBanned(content) {
	// Get the banned words using the helper function
	const bannedWords = parseCurses();

	const hasBannedWord = bannedWords.some(word => content.includes(word.toLowerCase()));
	return hasBannedWord
}

module.exports = {
    handleCursesInThreads,
	handleCursesInMessages
};