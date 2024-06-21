// read-users.ts

import {
  Match,
  User,
  UserPref,
  MaritalStatus,
  ExerciseFrequency,
  DrinkingFrequency,
  PoliticalAffiliation,
  MatchSubmission
} from "@/types/matchmaking";
import matckmakingData from "./matchmaking.json";

export function parseUserSubmissions(): MatchSubmission[]  {
  const submissionsData = matckmakingData.submissions
  if (!Array.isArray(submissionsData)) {
    throw new Error("Invalid JSON data. Expected an array.");
  }

  const parsedSubmissions: MatchSubmission[] = submissionsData.map((submissionData: any) => {
    return {
      username: submissionData.username.replaceAll(" ", "").replaceAll("@", ""),
      wants: submissionData.wants
    }
  })

  return parsedSubmissions
}

// Function to parse JSON data into User objects
export function parseUsers(): User[] {
  const usersData = matckmakingData.users
  if (!Array.isArray(usersData)) {
    throw new Error("Invalid JSON data. Expected an array.");
  }

  // Map over each user data object and parse into User type
  const parsedUsers: User[] = usersData.map((userData: any) => {
    // Destructure user data and preferences
    const { prefs, ...userDataWithoutPrefs } = userData;

    // Parse user preferences into UserPref type
    const parsedPrefs: UserPref = {
      ageMin: prefs.ageMin,
      ageMax: prefs.ageMax,
      maritalStatus: prefs.maritalStatus ? prefs.maritalStatus.split(", ") : [],
      hasKids: prefs.hasKids ? prefs.hasKids.split(", ") : [],
      virginalStatus: prefs.virginalStatus
        ? prefs.virginalStatus.split(", ")
        : [],
      drugUse: prefs.drugUse ? prefs.drugUse.split(", ") : [],
      politic: prefs.politic ? prefs.politic.split(", ") : [],
      exerciseFreq: prefs.exerciseFreq ? prefs.exerciseFreq.split(", ") : [],
      drinkingFreq: prefs.drinkingFreq ? prefs.drinkingFreq.split(", ") : [],
    };

    // Construct User object with parsed data
    const parsedUser: User = {
      prefs: parsedPrefs,
      ...userDataWithoutPrefs, // Spread remaining user data
      maritalStatus: userData.maritalStatus,
      drugUse: userData.drugUse ? userData.drugUse.split(", ") : [],
      hasKids: userData.hasKids,
      wantsKids: userData.wantsKids === "true",
      wouldRelocate: userData.wouldRelocate === "true",
      weight: parseInt(userData.weight),
      age: parseInt(userData.age),
      virginalStatus: userData.virginalStatus,
      isWaiting: userData.isWaiting === "true",
    };
    return parsedUser;
  });

  return parsedUsers;
}

export function parseUserProfileAsString(user: User) {
  return `Gender: ${user.gender}
  Age: ${user.age}
  Location: ${user.location}
  Marital Status: ${user.maritalStatus}
  Has Kids: ${user.hasKids ? "Yes" : "No"}
  Wants Kids: ${user.wantsKids ? "Yes" : "No"}
  Income: ${user.income}
  Weight: ${user.weight} lbs
  Height: ${user.height}
  Exercise Frequency: ${user.exerciseFreq}
  Drinking Frequency: ${user.drinkingFreq}
  Ethnicity: ${user.ethnicity}
  Political Affiliation: ${user.politic}
  Education: ${user.education}
  Faith: ${user.faith}
  Bio: ${user.bio}`;
}

export function parseUserAsString(user: User) {
  return `User ID: ${user.userID}
  Username: ${user.username}
  Gender: ${user.gender}
  Age: ${user.age}
  Location: ${user.location}
  Marital Status: ${user.maritalStatus}
  Has Kids: ${user.hasKids ? "Yes" : "No"}
  Wants Kids: ${user.wantsKids ? "Yes" : "No"}
  Income: ${user.income}
  Weight: ${user.weight} lbs
  Height: ${user.height}
  Exercise Frequency: ${user.exerciseFreq}
  Drinking Frequency: ${user.drinkingFreq}
  Ethnicity: ${user.ethnicity}
  Political Affiliation: ${user.politic}
  Education: ${user.education}
  Faith: ${user.faith}
  Bio: ${user.bio}`;
}

export function parseUsersAsString(users: User[]) {
  const formattedString = users
    .map((user: User) => {
      const userString = `-----------------\n${parseUserAsString(user)}`;
      return userString.trim();
    })
    .join("\n\n");

  return formattedString;
}

export function parseMatchAsString(matches: Match[]) {
  return matches
    .map(
      (match: Match) => `${match.man.username} & ${match.woman.username}
      ----- ${match.man.username} ------
      ${parseUserAsString(match.man)}
      ----- ${match.woman.username} ------
      ${parseUserAsString(match.woman)}
      `
    )
    .join("\n\n");
}

export function parseMatchesAsString(matches: Match[]) {
  return matches
    .map((match: Match) => `@${match.man.username} & @${match.woman.username}`)
    .join("\n");
}
