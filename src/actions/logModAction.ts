import { log, sys } from "@/log";
import { EmbedBuilder, TextChannel } from "discord.js";
import { ModLogMessage } from "@/types/mod";
import config from "@/config.json";
import bot from "@/bot";

export async function logModAction(modLogMessage: ModLogMessage) {
  try {
    const channel = await bot.discord.channels.fetch(config.channels.modLog);

    // inside a command, event listener, etc.
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(modLogMessage.action)
      .setAuthor({
        name: modLogMessage.mod,
      })
      .setDescription(modLogMessage.message)
      .setTimestamp();

    console.log(channel);
    return await (channel as TextChannel).send({ embeds: [exampleEmbed] });
  } catch (error: any) {
    log(sys.thread.unknown, error);
  }
}
