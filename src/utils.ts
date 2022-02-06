/**
 * @param {string[]} classes - List of className strings
 */
export function joinClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
