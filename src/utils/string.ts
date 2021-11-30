export const ellipsis = (text: string, limit: number) => {
  return text.length > limit ? text.substr(0, limit) + "..." : text;
};
