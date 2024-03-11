import { Submission } from "snoowrap";
import { fetchPostsInRange } from "./base/fetchPostsInRange";

export async function fetchPostsFromCurrentYear(
  flair?: string
): Promise<Submission[]> {
  // Calculate the start and end dates for the current year
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  // Retrieve posts from the current year using the base function
  return fetchPostsInRange(startOfYear, endOfYear, flair);
}
