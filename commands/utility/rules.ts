import { SlashCommandBuilder } from 'discord.js';
import { parseRulesAsList, parseRulesHeading, parseRulesRevision, parseRuleByNumber } from '@/json/parseRules';
import { discordQuote } from '@/helpers/discordQuote';
import { DiscordCommandType } from '@/types/discord';

const rulesCommand: DiscordCommandType = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Replies with server rules.')
        .addStringOption(option =>
            option
                .setName('rule_number')
                .setDescription('The specific rule, if any.')),
    async execute(interaction: any) {
        const tenet = interaction.options.getString('rule_number');
        const tenets = parseRulesAsList();

        let result;
        if (tenet && (typeof parseInt(tenet) == "number")) {
            result = parseRuleByNumber(tenet);
        } else {
            result = `***${parseRulesHeading()}***\n${tenets.join("\n")}\n${parseRulesRevision()}`;
        }

        await interaction.reply(discordQuote(result));
    },
};

export default rulesCommand;
