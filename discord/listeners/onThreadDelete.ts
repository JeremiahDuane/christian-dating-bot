import { handleRemovedIntroducedRole } from "@/handlers/handleRemoveIntroducedRole";
import { AnyThreadChannel } from "discord.js";

export default function onThreadDelete(thread: AnyThreadChannel<boolean>) {
    handleRemovedIntroducedRole(thread);
}