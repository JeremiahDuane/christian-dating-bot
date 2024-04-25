import { Collection } from "discord.js";
import banCommand from "@/commands/utility/ban";
import removeMessage from "@/commands/utility/removeMessage";
import pingCommand from "@/commands/utility/ping";
import profileCommand from "@/commands/utility/profile";
import rulesCommand from "@/commands/utility/rules";
import serverCommand from "@/commands/utility/server";
import userCommand from "@/commands/utility/user";
import matchmakeCommand from "@/commands/utility/matchmake";
import { DiscordCommandType } from "@/types/discord";
export const commands = new Collection<string, DiscordCommandType>([
  ["ban", banCommand],
  ["remove_message", removeMessage],
  ["ping", pingCommand],
  ["profile", profileCommand],
  ["rules", rulesCommand],
  ["server", serverCommand],
  ["user", userCommand],
]);
