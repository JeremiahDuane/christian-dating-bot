import { Match, User as UserProfile, UserPref } from "@/types/matchmaking";
import { parseUsers } from "@/json/parseUsers";
import bot from "@/bot";
import { Embed, EmbedBuilder, User } from "discord.js";
import { shortenToMaxLength } from "@/helpers/shortenToMaxLength";
import { log } from "@/log";
import matckmakingData from "@/json/matchmaking.json";

function getMatchEmbed(user: UserProfile): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle(`You matched! Send a message to ${user.username}!`)
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

  return embed;
}


function sendMatch(user1: UserProfile, user2: UserProfile, message: string, matchNumber: number){
  const embed1 = getMatchEmbed(user1)
  const embed2 = getMatchEmbed(user2)
  try {
    user1.discord.send({embeds: [embed2]})
    user2.discord.send({embeds: [embed1]})
  } catch (error) {
    log("SEND_MATCH", error)
  }
}

// Function to get matches by comparing each user to every other user
export function sendMatches(matches: Match[]) {
  matches.forEach(({man, woman, message}, index) => {
    man.discord = bot.discord.users.cache.find(u => u.username === man.username)
    woman.discord = bot.discord.users.cache.find(u => u.username === woman.username)
    
    sendMatch(man, woman, message, index+1)
  })
}
