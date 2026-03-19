/** Get a nested value from an object via dot-notation path */
export const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

/** Convert a camelCase/dot-notation key to a human-readable title */
export const humanize = (str: string): string => {
  return str
    .split('.')
    .pop()!
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
};
