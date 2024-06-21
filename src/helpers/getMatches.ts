import { Match, MatchSubmission, User, UserPref } from "@/types/matchmaking";
import { parseUserSubmissions, parseUsers } from "@/json/parseUsers";

function wants(user1: User, user2: User): boolean {
  return user1?.submission?.wants?.includes(user2.userID);
}


function isMatch(user1: User, user2: User): Match | boolean {
  // Compare genders of user1 and user2 (genders should be different)
  if (user1.gender === user2.gender) return false;

  // Check if user1's characteristics are wanted by user2 and vice versa
  const user1WantsUser2 = wants(user1, user2);
  const user2WantsUser1 = wants(user2, user1);

  // Users are a match if genders are different and both users want each other's characteristics
  if (user1WantsUser2 && user2WantsUser1) {
    return {
      man: user1.gender.toUpperCase().includes("F") ? user2 : user1,
      woman: user2.gender.toUpperCase().includes("F") ? user2 : user1,
      message: "It is a match!",
    };
  } else {
    return false;
  }
}

// Function to get matches by comparing each user to every other user
export function getUsersWithSubmissions(): User[] {
  const users = parseUsers();
  const submissions = parseUserSubmissions()

  const usersWithSubmissions: User[] = [];

  for (let submission of submissions) {
    for (let user of users) {
      if (submission.username === user.username) {
        user.submission = submission;
        usersWithSubmissions.push(user)
      }
    }
  }

  return users;
}

// Function to get matches by comparing each user to every other user
export function getMatches(): Match[] {
  const users = getUsersWithSubmissions();
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
