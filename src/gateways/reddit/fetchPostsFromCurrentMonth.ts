import { Submission } from "snoowrap";
import { fetchPostsInRange } from "./base/fetchPostsInRange";

export async function fetchPostsFromCurrentMonth(
  flair?: string
): Promise<Submission[]> {
  // Calculate the start and end dates for the current month
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // Retrieve posts within the current month using the base function
  return fetchPostsInRange(startOfMonth, endOfMonth, flair);
}
