const json = require('./curses.json')
const fs = require('fs');
const path = require('path');

const parseCursesMessage = () => "Your post was deleted for banned language. If you think this was done in error, then please contact the mods."
const parseCursesReply = () => "Sir, this is a Christian Server."

function parseCurses() {
    // Extract banned words for each language
    const bannedWords = [];
    const languages = json.languages;
    const curses = json.curses;

    languages.forEach(language => {
        if (curses[language]) {
            bannedWords.push(...curses[language]);
        }
    });

    return bannedWords;
}

module.exports = { 
    parseCurses,
    parseCursesMessage,
    parseCursesReply
}