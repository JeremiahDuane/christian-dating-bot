import json from "@/json/reddit.json";
import { postMessageIfNotPostedYet } from "@/gateways/reddit/base/postMessageIfNotYetPosted";
import { fetchIntroductionPosts } from "@/gateways/webscrapers/fetchIntroductionPosts";
import { redditLink } from "@/helpers/redditLink";

function isMale(title: string): boolean {
  return title.includes("m4f") || title.match(/m\d{2}/i) !== null;
}

function isFemale(title: string): boolean {
  return title.includes("f4m") || title.match(/f\d{2}/i) !== null;
}

export async function handleIntroductionPostHighlights() {
  const malePosts: string[] = [];
  const femalePosts: string[] = [];
  const posts = await fetchIntroductionPosts();

  posts.forEach((post) => {
    const title = post.title.toLowerCase();
    if (isMale(title)) malePosts.push(redditLink(post.title, post.url));
    else if (isFemale(title))
      femalePosts.push(redditLink(post.title, post.url));
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date();
  date.setDate(0);

  const title = json.introductions.title
    .replace("{yyyy}", `${date.getFullYear()}`)
    .replace("{mmmm}", months[date.getMonth()]);

  const content = [];
  if (json.introductions.header) content.push(json.introductions.header);
  content.push("\n");
  if (malePosts.length) content.push("---------");
  if (malePosts.length) content.push("**Male Profiles**");
  if (malePosts.length) content.push(...malePosts);
  if (malePosts.length || femalePosts.length) content.push("---------");
  if (femalePosts.length) content.push("**Female Profiles**");
  if (femalePosts.length) content.push(...femalePosts);
  if (femalePosts.length) content.push("---------");
  content.push("\n");
  if (json.introductions.footer) content.push(json.introductions.footer);

  const message = {
    title: title,
    content: content.join("\n\n"),
  };

  postMessageIfNotPostedYet(message);
}
