import { handleIntroductionPostHighlights } from "@/handlers/handleIntroductionHighlights";

export default async function everyMinute() {
  handleIntroductionPostHighlights();
}
