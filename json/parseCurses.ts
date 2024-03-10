import json from '@/json/curses.json';

const parseCursesMessage = (): string => "Your post was deleted for banned language. If you think this was done in error, then please contact the mods.";

const parseCursesReply = (): string => "Sir, this is a Christian Server.";

function parseCurses(): string[] {
    // Extract banned words for each language
    const bannedWords: string[] = [];
    const languages: string[] = json.languages;
    const curses: { [key: string]: string[] } = json.curses;

    languages.forEach(language => {
        if (curses[language]) {
            bannedWords.push(...curses[language]);
        }
    });

    return bannedWords;
}

export { 
    parseCurses,
    parseCursesMessage,
    parseCursesReply
};
