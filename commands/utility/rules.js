const { SlashCommandBuilder } = require('discord.js');
const { parseRulesAsList, parseRulesHeading, parseRulesRevision, parseRuleByNumber } = require('../../json/parseRules');
const { discordQuote } = require('../../helpers/discordQuote');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('Replies with server rules.')
        .addStringOption(option =>
			option
				.setName('rule_number')
				.setDescription('The specific rule, if any.')),
	async execute(interaction) {
        const tenet = interaction.options.getString('rule_number');
        const tenets = parseRulesAsList() 
        
        let result;
        if (tenet && (typeof parseInt(tenet) == "number")) {
            result = parseRuleByNumber(tenet)
        } else {
            result = `***${parseRulesHeading()}***\n${tenets.join("\n")}\n${parseRulesRevision()}`
        }

        await interaction.reply(discordQuote(result));
	},
};
