import { Match, User, UserPref } from "@/types/matchmaking";
import { parseUsers } from "@/json/parseUsers";

function wants(user: User, prefs: UserPref): boolean {
  if (user.age < prefs.ageMin && user.age > prefs.ageMax) return false;

  if (
    prefs.virginalStatus &&
    prefs.virginalStatus.length &&
    !prefs.virginalStatus.includes(user.virginalStatus)
  )
    return false;

  if (
    prefs.politic &&
    prefs.politic.length &&
    !prefs.politic.includes(user.politic)
  )
    return false;

  if (
    prefs.maritalStatus &&
    prefs.maritalStatus.length &&
    !prefs.maritalStatus.includes(user.maritalStatus)
  )
    return false;

  if (
    user.drugUse &&
    user.drugUse.length &&
    !user.drugUse.some((drug) => prefs.drugUse.includes(drug))
  )
    return false;

  if (
    prefs.exerciseFreq &&
    prefs.exerciseFreq.length &&
    !prefs.exerciseFreq.includes(user.exerciseFreq)
  )
    return false;

  if (
    prefs.drinkingFreq &&
    prefs.drinkingFreq.length &&
    !prefs.drinkingFreq.includes(user.drinkingFreq)
  )
    return false;

  if (
    prefs.hasKids &&
    prefs.hasKids.length &&
    !prefs.hasKids.includes(user.hasKids)
  )
    return false;
  return true;
}

function isMatch(user1: User, user2: User): Match | boolean {
  // Compare genders of user1 and user2 (genders should be different)
  if (user1.gender === user2.gender) return false;

  // Check if user1's characteristics are wanted by user2 and vice versa
  const user1WantsUser2 = wants(user1, user2.prefs);
  const user2WantsUser1 = wants(user2, user1.prefs);

  // Users are a match if genders are different and both users want each other's characteristics
  if (user1WantsUser2 && user2WantsUser1) {
    return {
      man: user1.gender.toUpperCase().includes("F") ? user2 : user1,
      woman: user2.gender.toUpperCase().includes("F") ? user2 : user1,
      message: "It is a potential match!",
    };
  } else {
    return false;
  }
}

// Function to get matches by comparing each user to every other user
export function getPotentialMatches(): Match[] {
  const users = parseUsers();
  const matches: Match[] = [];

  for (let user1 of users.filter((u) => u.gender.toLowerCase().includes("f"))) {
    for (let user2 of users.filter(
      (u) => !u.gender.toLowerCase().includes("f")
    )) {
      const match = isMatch(user1, user2);
      if (typeof match !== "boolean") matches.push(match);
    }
  }

  return matches;
}
