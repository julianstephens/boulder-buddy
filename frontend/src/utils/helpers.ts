export const toCamelCase = (text: string) =>
  `${text[0]?.toLowerCase()}${text.slice(1)}`;
