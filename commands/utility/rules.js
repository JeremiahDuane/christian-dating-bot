const { SlashCommandBuilder } = require('discord.js');
const json = require('../../json/rules.json')

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
        const tenets = json.tenets.map((tenet, index) => `${index+1}. **${tenet.rule}**: ${tenet.description}` )
        
        let result;
        if (tenet && (typeof parseInt(tenet) == "number")) {
            const tenetNumber = parseInt(tenet)-1
            result = tenetNumber <= 0 
                ? tenets[0] : tenetNumber > tenets.length - 1 
                ? tenets[tenets.length - 1] 
                : tenets[tenetNumber] 
        } else {
            result = `***${json.heading}***\n${tenets.join("\n")}\n\`Revised:${json.revised}\``
        }

        await interaction.reply(result);
	},
};
