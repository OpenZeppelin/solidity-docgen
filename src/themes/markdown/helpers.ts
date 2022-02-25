import { HelperOptions, Utils } from 'handlebars';
import { TypeName } from 'solidity-ast';
import { DocItemWithContext } from '../../site';

type HLevel = { hlevel?: number };
type DocItemWithHLevel = DocItemWithContext & HLevel;

/**
 * Returns a Markdown heading marker. An optional number increases the heading level.
 *
 *    Input                  Output
 *    {{h}} {{name}}         # Name
 *    {{h 2}} {{name}}       ## Name
 */
export function h(this: DocItemWithHLevel, hsublevel: number | HelperOptions) {
  ({ hsublevel } = getHSublevel(hsublevel));
  hsublevel = typeof hsublevel === 'number' ? Math.max(1, hsublevel) : 1;
  return new Array(getHLevel(this) + hsublevel - 1).fill('#').join('');
};

/**
 * Delineates a section where headings should be increased by 1 or a custom number.
 *
 *    {{#hsection}}
 *    {{>partial-with-headings}}
 *    {{/hsection}}
 */
export function hsection(this: DocItemWithHLevel, opts: HelperOptions): string;
export function hsection(this: DocItemWithHLevel, hsublevel: number, opts: HelperOptions): string;
export function hsection(this: DocItemWithHLevel, hsublevel: number | HelperOptions, opts?: HelperOptions) {
  ({ hsublevel, opts } = getHSublevel(hsublevel, opts));
  const hlevel = getHLevel(this) + hsublevel;
  const ctx = Utils.extend({}, this, { hlevel });
  return opts.fn(ctx, opts);
}

/**
 * Helper for dealing with the optional hsublevel argument.
 */
function getHSublevel(hsublevel: number | HelperOptions): { hsublevel: number };
function getHSublevel(hsublevel: number | HelperOptions, opts?: HelperOptions): { hsublevel: number, opts: HelperOptions };
function getHSublevel(hsublevel: number | HelperOptions, opts?: HelperOptions) {
  if (typeof hsublevel === 'number') {
    opts = opts!;
    return { hsublevel: Math.max(1, hsublevel), opts };
  } else {
    opts = hsublevel;
    return { hsublevel: 1, opts };
  }
}

function getHLevel(ctx: HLevel): number {
  return ctx.hlevel ?? 1;
}

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
