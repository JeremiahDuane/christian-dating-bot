import { log, sys } from "@/log";
import {
  parseCurses,
  parseCursesReply,
  parseCursesMessage,
} from "@/json/parseCurses";
import { AnyThreadChannel } from "discord.js";

function isBanned(content: string): boolean {
  if (!content) return false;
  const bannedWords: string[] = parseCurses();

  const contentLower: string = content.toLowerCase();
  const hasBannedWord: boolean = bannedWords.some((word) =>
    contentLower.includes(word.toLowerCase())
  );
  return hasBannedWord;
}

async function handleCursesInThreads(
  thread: AnyThreadChannel<boolean>
): Promise<void> {
  const content: string = thread.name;

  // If the message contains a banned word, delete it
  if (isBanned(content)) {
    try {
      log(sys.thread.deleted.cursing);
      // Reply to the message before deleting it
      const author = await thread.fetchOwner();
      await author.user.send(parseCursesMessage());
      // Delete the thread
      await thread.delete();
    } catch (error) {
      log(sys.thread.deleted.cursing, error);
    }
  }
}

async function handleCursesInMessages(message: any): Promise<void> {
  const content: string = message.content;
  console.log("2", message, content);
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

export { handleCursesInThreads, handleCursesInMessages };
