import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from "discord.js";
import { DiscordCommandType } from "@/types/discord";
import {
  parseUsersAsString,
  parseUsers,
  parseMatchesAsString,
} from "@/json/parseUsers";
import { log } from "@/log";
import { getPotentialMatches } from "@/helpers/getPotentialMatches";
import { sendPotentialMatches } from "@/actions/sendPotentialMatches";
import { getMatches } from "@/helpers/getMatches";
import { sendMatches } from "@/actions/sendMatches";

const userCommand: DiscordCommandType = {
  data: new SlashCommandBuilder()
    .setName("matchmake")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDescription(
      "Runs the matchmaking service using pre-set server JSON (WARNING: DOES NOT AUTO-UPDATE)"
    ),
  async execute(interaction) {
    const tryPhase1 = new ButtonBuilder()
      .setCustomId("TRY_POTENTIAL_MATCHES")
      .setLabel("Get a list of Phase 1 potential matches.")
      .setStyle(ButtonStyle.Success);

    const phase1 = new ButtonBuilder()
      .setCustomId("SEND_POTENTIAL_MATCHES")
      .setLabel("Send Phase 1 potential matches.")
      .setStyle(ButtonStyle.Danger);

    const tryPhase2 = new ButtonBuilder()
      .setCustomId("TRY_SEND_MATCHES")
      .setLabel("Get a list of Phase 2 matches.")
      .setStyle(ButtonStyle.Success);

    const phase2 = new ButtonBuilder()
      .setCustomId("SEND_MATCHES")
      .setLabel("Send Phase 2 matches.")
      .setStyle(ButtonStyle.Danger);

    const cancel = new ButtonBuilder()
      .setCustomId("cancel")
      .setLabel("Cancel")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(cancel, tryPhase1, phase1, tryPhase2, phase2);

    const response = await interaction.reply({
      content: `*MATCHMAKING FUNCTIONS*`,
      components: [row],
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;

    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 60_000,
      });

      if (confirmation.customId === "TRY_POTENTIAL_MATCHES") {
        const potentialMatches = getPotentialMatches();
        await confirmation.update({
          content: `${potentialMatches.length} potential matches have been created. A full list has been sent to your inbox.`,
          components: [],
        });

        await interaction.user.send(
          `Potential Matches: \n\n ${parseMatchesAsString(potentialMatches)}`
        );
      } else if (confirmation.customId === "SEND_POTENTIAL_MATCHES") {
        const potentialMatches = getPotentialMatches();

        sendPotentialMatches(potentialMatches)

        await confirmation.update({
          content: `${potentialMatches.length} potential matches have been created and sent out. A full list has been sent to your inbox.`,
          components: [],
        });

        await interaction.user.send(
          `Potential Matches: \n\n ${parseMatchesAsString(potentialMatches)}`
        );
      } else if (confirmation.customId === "TRY_SEND_MATCHES") {
        const matches = getMatches();

        await confirmation.update({
          content: `${matches.length} matches have been created. A full list has been sent to your inbox.`,
          components: [],
        });

        await interaction.user.send(
          `Matches: \n\n ${parseMatchesAsString(matches)}`
        );
      } else if (confirmation.customId === "SEND_MATCHES") {
        const matches = getMatches();

        sendMatches(matches)

        await confirmation.update({
          content: `${matches.length} matches have been created and sent out. A full list has been sent to your inbox.`,
          components: [],
        });

        await interaction.user.send(
          `Matches: \n\n ${parseMatchesAsString(matches)}`
        );
      } else if (confirmation.customId === "cancel") {
        await confirmation.update({
          content: "Action cancelled",
          components: [],
        });
      }
    } catch (e) {
      log("MATCHMAKING", e);
      await interaction.editReply({
        content: "Confirmation not received within 30 seconds, cancelling",
        components: [],
      });
    }
  },
};

export default userCommand;
