import { TypeName } from "solidity-ast";
import { DocItemWithContext } from "../../site";

/**
 * Returns a Markdown heading marker. An optional `hlevel` context variable increases the heading level.
 *
 * Examples:
 *     {{h}} {{name}}
 *     {{h 1}} {{Name}}
 *     {{h}} Functions
 */
export function h(this: DocItemWithContext & { hlevel?: number }, hsublevel: number | object) {
  hsublevel = typeof hsublevel === 'number' ? Math.max(1, hsublevel) : 1;
  return new Array((this.hlevel ?? 1) + hsublevel - 1).fill('#').join('');
};

export function trim(text: string) {
  if (typeof text === 'string') {
    return text.trim();
  }
}

export function joinLines(text?: string) {
  if (typeof text === 'string') {
    return text.replace(/\n+/g, ' ');
  }
}
