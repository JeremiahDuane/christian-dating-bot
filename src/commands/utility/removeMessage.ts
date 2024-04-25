import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";
import { parseRemoveMessageFromRuleNumber } from "@/json/parseRules";
import { DiscordCommandType } from "@/types/discord";
import { logModAction } from "@/actions/logModAction";
import { ModAction } from "@/types/mod";

const banCommand: DiscordCommandType = {
  data: new SlashCommandBuilder()
    .setName("remove_message")
    .setDescription("Removes a message.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("message_id")
        .setDescription("The message ID.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("rule_number")
        .setDescription("The specific rule.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Any further reasoning, if desired.")
    ),
  async execute(interaction: any) {
    const tenet = interaction.options.getString("rule_number");
    const reason = interaction.options.getString("reason");
    const messageId = interaction.options.getString("message_id");

    const message = await interaction.channel.messages.fetch(messageId);
    if (message) {
      const reply = await interaction.reply("Deleted!");
      await message.author.send(
        parseRemoveMessageFromRuleNumber(tenet, reason)
      );
      await logModAction({
        message: `${message.author.username}: ${message.content}`,
        mod: interaction.user.username,
        action: ModAction.MESSAGE_REMOVAL,
      });
      await message.delete();
      await reply.delete();
    } else {
      await interaction.reply("No message found to delete.");
    }
  },
};

export default banCommand;
