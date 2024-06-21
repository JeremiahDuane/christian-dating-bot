export function shortenToMaxLength(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength-4) + "...";
    }
    return text;
  }
  