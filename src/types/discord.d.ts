import { Collection, SlashCommandBuilder } from "discord.js";

declare module "discord.js" {
  export interface Client {
    commands: Collection<any, any>;
  }
}

export type DiscordCommandType = {
  data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
  execute(interaction: any): Promise<void>
}