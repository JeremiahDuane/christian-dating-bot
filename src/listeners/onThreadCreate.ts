import { handleAddIntroducedRole } from "@/handlers/handleAddIntroducedRole";
import { handleCursesInThreads } from "@/handlers/handleCurses";
import { AnyThreadChannel } from "discord.js";

export default function onThreadCreate(thread: AnyThreadChannel<boolean>) {
    handleCursesInThreads(thread);
    handleAddIntroducedRole(thread);
}