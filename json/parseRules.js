const { discordQuote } = require('../helpers/discordQuote')
const json = require('./rules.json')

const parseRuleAsString = (tenet, index) => `${index+1}. **${tenet.rule}**: ${tenet.description}`

const parseRulesAsList = () => json.tenets.map((tenet, index) => `${index+1}. **${tenet.rule}**: ${tenet.description}` )

const parseRulesHeading = () => json.heading

const parseRulesRevision = () => `\`Revised: ${json.revised}\``

const parseRuleIndex = (index) => {
    const tenetNumber = parseInt(index)-1
    return tenetNumber <= 0 
        ? 0 : tenetNumber > json.tenets.length - 1 
        ? json.tenets.length - 1
        : tenetNumber 
}

const parseRuleByNumber = (index) => {
    return parseRulesAsList()[parseRuleIndex(index)]
}

const parseBanReplyFromRuleNumberAndUser = (tenet, user) => {
    return `<@${user.id}> has been banned for breaking \n ${discordQuote(parseRuleByNumber(tenet))}`
}

const parseBanMessageFromRuleNumber = (tenet, reason) => {
    return `You have been banned from *Christian Dating* discord server for breaking the following rule: \n\n${discordQuote(parseRuleByNumber(tenet))}${reason ? '\n\n' + reason : ''}`
}

module.exports = { 
    parseRuleAsString,
    parseRulesAsList,
    parseRulesHeading,
    parseRulesRevision,
    parseRuleIndex,
    parseRuleByNumber,
    parseBanMessageFromRuleNumber,
    parseBanReplyFromRuleNumberAndUser
}