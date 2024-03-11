import { Submission } from "snoowrap";
import { fetchPostsInRange } from "./base/fetchPostsInRange";

export async function fetchPostsFromPreviousMonth(
  flair?: string
): Promise<Submission[]> {
  // Calculate the start and end dates for the previous month
  const today = new Date();
  const startOfPreviousMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );
  const endOfPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0);

  // Retrieve posts from the previous month using the base function
  return fetchPostsInRange(startOfPreviousMonth, endOfPreviousMonth, flair);
}
