const { log, sys } = require('../helpers/logger');
const { parseCurses, parseCursesReply, parseCursesMessage } = require('../json/parseCurses');

function isBanned(content) {
	const bannedWords = parseCurses();
	const contentLower = content.toLowerCase()
	const hasBannedWord = bannedWords.some(word => contentLower.includes(word.toLowerCase()));
	return hasBannedWord
}

async function handleCursesInThreads(thread) {
	const content = thread.name;
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
	const content = message.content;
	
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

module.exports = {
    handleCursesInThreads,
	handleCursesInMessages
};