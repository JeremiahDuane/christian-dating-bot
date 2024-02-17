const { log, sys } = require('../helpers/logger');
const { parseCurses, parseCursesMessage } = require('../json/parseCurses');

async function handleCurses(message) {
	// Get the banned words using the helper function
	const bannedWords = parseCurses();

	// Parse message content for banned words
	const content = message.content.toLowerCase();
	const hasBannedWord = bannedWords.some(word => content.includes(word.toLowerCase()));

	// If the message contains a banned word, delete it
	if (hasBannedWord) {
		try {
			log(sys.message.deleted.cursing);
			// Reply to the message before deleting it
			await message.reply(parseCursesMessage());
			// Delete the message
			await message.delete();
		} catch (error) {
			log(sys.message.deleted.cursing, error);
		}
	}
}
module.exports = {
    handleCurses
};