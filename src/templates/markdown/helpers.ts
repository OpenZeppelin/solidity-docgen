import { DocItemWithContext } from "../../site";

/**
 * Returns a Markdown heading prefix. An optional `hlevel` context variable increases the heading level.
 *
 * Examples:
 *     {{h}} {{name}}
 *     {{h 1}} {{Name}}
 *     {{h}} Functions
 */
export function h(this: DocItemWithContext & { hlevel?: number }, hsublevel: number | object) {
  if (typeof hsublevel !== 'number') {
    hsublevel = 1;
  } else {
    hsublevel = Math.max(1, hsublevel);
  }
  return new Array((this.hlevel ?? 0) + hsublevel).fill('#').join('');
};
