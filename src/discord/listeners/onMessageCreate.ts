import { handleCursesInMessages } from "@/handlers/handleCurses";
import { handleFeeds } from "@/handlers/handleFeeds";
import { Message } from "discord.js";

export default function onMessageCreate(message: Message<boolean>) {
    handleFeeds(message);
    // Ignore messages from bots
    if (message.author?.bot) return;
    handleCursesInMessages(Message);
}