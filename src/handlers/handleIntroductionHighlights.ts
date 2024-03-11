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
  const malePosts: string[] = ["Men:"];
  const femalePosts: string[] = ["Women:"];
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

  const content = [
    json.introductions.header,
    ...malePosts,
    ...femalePosts,
    json.introductions.footer,
  ].join("\n\n");

  const message = {
    title: title,
    content: content,
  };

  postMessageIfNotPostedYet(message);
}
