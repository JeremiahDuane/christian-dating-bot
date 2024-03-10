import { Collection } from "discord.js";
import banCommand from "@/commands/utility/ban";
import pingCommand from "@/commands/utility/ping";
import profileCommand from "@/commands/utility/profile";
import rulesCommand from "@/commands/utility/rules";
import serverCommand from "@/commands/utility/server";
import userCommand from "@/commands/utility/user";

export const commands = new Collection([
    ['ban', banCommand],
    ['ping', pingCommand],
    ['profile', profileCommand],
    ['rules', rulesCommand],
    ['server', serverCommand],
    ['user', userCommand]
]);
