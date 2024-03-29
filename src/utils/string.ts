export const ellipsis = (text: string, limit: number) => {
  if (!text) {
    return "";
  }
  return text.length > limit ? text.substr(0, limit) + "..." : text;
};
