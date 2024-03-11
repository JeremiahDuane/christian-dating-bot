import { handleCursesInMessages } from "@/handlers/handleCurses";
import { Message } from "discord.js";

export default function onMessageCreate(message: Message<boolean>) {
  // Ignore messages from bots
  if (message.author?.bot) return;
  handleCursesInMessages(Message);
}
