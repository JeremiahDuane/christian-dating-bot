const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { parseBanReplyFromRuleNumberAndUser, parseBanMessageFromRuleNumber } = require('../../json/parseRules');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a user for breaking a server rule.')
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false)
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to ban.')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('rule_number')
				.setDescription('The specific rule.')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('Any further reasoning, if desired.')),
	async execute(interaction) {
		const tenet = interaction.options.getString('rule_number');
		const reason = interaction.options.getString('reason');
		const target = interaction.options.getUser('target');

		await target.send(parseBanMessageFromRuleNumber(tenet, reason));
		await interaction.guild.members.ban(target);
		await interaction.reply(parseBanReplyFromRuleNumberAndUser(tenet, target));
	},
};
