import { Match, User as UserProfile, UserPref } from "@/types/matchmaking";
import { parseUsers } from "@/json/parseUsers";
import bot from "@/bot";
import { Embed, EmbedBuilder, User } from "discord.js";
import { shortenToMaxLength } from "@/helpers/shortenToMaxLength";
import { log } from "@/log";
import matckmakingData from "@/json/matchmaking.json";

function getPotentialMatchEmbed(user: UserProfile): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle(`User #${user.userID}`)
    .setDescription(`Faith: ${shortenToMaxLength(user.faith, 1000)} \n\n Bio: ${shortenToMaxLength(user.bio, 1000)}`)
    .addFields(
      { name: 'Gender', value: user.gender },
      { name: 'Age', value: `${user.age}` },
      { name: 'Location', value: user.location },
      { name: 'Would Relocate', value: user.wouldRelocate ? 'Yes' : 'No' },
      { name: 'Marital Status', value: user.maritalStatus },
      { name: 'Has Kids', value: user.hasKids ? 'Yes' : 'No' },
      { name: 'Wants Kids', value: user.wantsKids ? 'Yes' : 'No' },
      { name: 'Income', value: user.income },
      { name: 'Weight', value: `${user.weight}lbs` },
      { name: 'Height', value: user.height },
      { name: 'Exercise Frequency', value: user.exerciseFreq },
      { name: 'Drinking Frequency', value: user.drinkingFreq },
      { name: 'Drug Use', value: user.drugUse.join(', ') },
      { name: 'Is Waiting', value: user.isWaiting ? 'Yes' : 'No' },
      { name: 'Ethnicity', value: user.ethnicity },
      { name: 'Political Affiliation', value: user.politic },
      { name: 'Education', value: user.education },
      { name: 'Faith', value: user.faith },
      { name: 'Bio', value: user.bio }
    )
    .setURL(matckmakingData.link);

  return embed;
}


function sendUserPotentialMatch(user: User, potentialMatchProfile: UserProfile){
  const embed = getPotentialMatchEmbed(potentialMatchProfile)
  try {
    user.send({embeds: [embed]})
  } catch (error) {
    log("SEND_USER_POTENTIAL_MATCH", error)
  }
}

// Function to get matches by comparing each user to every other user
export function sendPotentialMatches(matches: Match[]) {
  for (let {man, woman} of matches) {
    const maleUser = bot.discord.users.cache.find(u => u.username === man.username)
    sendUserPotentialMatch(maleUser, woman)

    const femaleUser = bot.discord.users.cache.find(u => u.username === woman.username)
    sendUserPotentialMatch(femaleUser, man)
  }
}
