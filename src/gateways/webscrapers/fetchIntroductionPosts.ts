import axios from "axios";
import config from "@/config.json";
import { Submission } from "snoowrap";
import { load } from "cheerio";

export async function fetchIntroductionPosts(): Promise<Submission[]> {
  const response = await axios.get(
    config.reddit.url + config.reddit.permaLinks.introductions
  );
  let $ = load(response.data);
  const results: Submission[] = [];

  $($('a[data-testid="post-title"]')).each((_i, element) => {
    const title = $(element.children).text().trim();
    results.push({
      title: title,
      url: $(element).attr("href"),
    } as Submission);
  });

  return results;
}
