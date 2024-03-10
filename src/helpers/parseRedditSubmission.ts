import { ForumPost } from "@/types/global";
import { Submission } from "snoowrap";

export function parseRedditSubmission(submission: Submission): ForumPost {
  return {
    title: submission.title,
    content: submission.selftext,
    url: `https://reddit.com${submission.permalink}`,
    author: submission.author.name,
    createdAt: new Date(submission.created_utc * 1000), // Convert UNIX timestamp to JavaScript Date
  };
}

export function parseRedditSubmissions(submissions: Submission[]): ForumPost[] {
  return submissions.map(parseRedditSubmission);
}
