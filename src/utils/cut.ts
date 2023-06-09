export const cut = (str: string): string => {
  if (str.length > 50) return str.substr(0, 50) + '...';
  return str;
};
