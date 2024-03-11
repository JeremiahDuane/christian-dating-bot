import { Submission } from "snoowrap";
import { fetchPostsInRange } from "./base/fetchPostsInRange";

export async function fetchPostsFromPreviousWeek(
  flair?: string
): Promise<Submission[]> {
  // Calculate the start and end dates for the past week
  const today = new Date();
  const startOfPastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  const endOfPastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // Retrieve posts from the past week using the base function
  return fetchPostsInRange(startOfPastWeek, endOfPastWeek, flair);
}
