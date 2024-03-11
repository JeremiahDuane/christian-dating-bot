import { handleRedditFeed } from "@/handlers/handleRedditFeed";

export default async function everyMinute() {
  handleRedditFeed();
}
