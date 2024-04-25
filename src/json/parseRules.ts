import { discordQuote } from "@/helpers/discordQuote";
import json from "@/json/rules.json";

const parseRuleAsString = (
  tenet: { rule: string; description: string },
  index: number
): string => `${index + 1}. **${tenet.rule}**: ${tenet.description}`;

const parseRulesAsList = (): string[] =>
  json.tenets.map(
    (tenet: { rule: string; description: string }, index: number) =>
      `${index + 1}. **${tenet.rule}**: ${tenet.description}`
  );

const parseRulesHeading = (): string => json.heading;

const parseRulesRevision = (): string => `\`Revised: ${json.revised}\``;

const parseRuleIndex = (index: number): number => {
  const tenetNumber = parseInt(index.toString()) - 1;
  return tenetNumber <= 0
    ? 0
    : tenetNumber > json.tenets.length - 1
    ? json.tenets.length - 1
    : tenetNumber;
};

const parseRuleByNumber = (index: number): string =>
  parseRulesAsList()[parseRuleIndex(index)];

const parseBanReplyFromRuleNumberAndUser = (
  tenet: number,
  user: { id: string }
): string =>
  `<@${user.id}> has been banned for breaking \n ${discordQuote(
    parseRuleByNumber(tenet)
  )}`;

const parseBanMessageFromRuleNumber = (
  tenet: number,
  reason?: string
): string =>
  `You have been banned from *Christian Dating* discord server for breaking the following rule: \n\n${discordQuote(
    parseRuleByNumber(tenet)
  )}${reason ? "\n\n" + reason : ""}`;

const parseRemoveMessageFromRuleNumber = (
  tenet: number,
  reason?: string
): string =>
  `Your message in the *Christian Dating* discord server was removed for breaking the following rule: \n\n${discordQuote(
    parseRuleByNumber(tenet)
  )}${reason ? "\n\n" + reason : ""}`;

export {
  parseRuleAsString,
  parseRulesAsList,
  parseRulesHeading,
  parseRulesRevision,
  parseRuleIndex,
  parseRuleByNumber,
  parseBanMessageFromRuleNumber,
  parseBanReplyFromRuleNumberAndUser,
  parseRemoveMessageFromRuleNumber,
};
