import path from 'path';
import fs, { promises as fsPromise } from 'fs';
import Handlebars, { RuntimeOptions } from 'handlebars';
import { findIn } from './utils/fs-exists';
import { mapValues } from './utils/map-values';
import { mapKeys } from './utils/map-keys';

export interface Templates {
  partials?: Record<string, () => string>;
  helpers?: Record<string, (...args: unknown[]) => string>;
}

/**
 * Loads the templates that will be used for rendering a site based on a
 * default theme and user templates.
 *
 * The result contains all partials and helpers defined in the user templates
 * and the default theme, where the user's take precedence if there is a clash.
 * Additionally, all theme partials are included with the theme prefix, e.g.
 * `markdown/contract` will be a partial.
 */
export async function loadTemplates(defaultTheme: string, root: string, userTemplatesPath?: string): Promise<Templates> {
  const themes = await readThemes();

  // Initialize templates with the default theme.
  const templates = {
    partials: { ...themes[defaultTheme]?.partials },
    helpers: { ...themes[defaultTheme]?.helpers },
  };

  if (templates === undefined) {
    throw new Error(`Unknown theme '${defaultTheme}'`);
  }

  templates.partials ??= {};
  templates.helpers ??= {};

  // Overwrite default theme with user templates.
  if (userTemplatesPath) {
    const userTemplates = await readTemplates(path.resolve(root, userTemplatesPath));
    if (userTemplates.partials) {
      Object.assign(templates.partials, userTemplates.partials);
    }
    if (userTemplates.helpers) {
      Object.assign(templates.helpers, userTemplates.helpers);
    }
  }

  // Add partials and helpers from all themes, prefixed with the theme name.
  for (const [themeName, theme] of Object.entries(themes)) {
    const addPrefix = (k: string) => `${themeName}/${k}`;
    if (theme.partials) {
      Object.assign(templates.partials, mapKeys(theme.partials, addPrefix));
    }
    if (theme.helpers) {
      Object.assign(templates.helpers, mapKeys(theme.helpers, addPrefix));
    }
  }

  return templates;
}

/**
 * Read templates and helpers from a directory.
 */
export async function readTemplates(dir: string): Promise<Templates> {
  return {
    partials: await readPartials(dir),
    helpers: await readHelpers(dir),
  };
}

async function readPartials(dir: string) {
  const partials: NonNullable<Templates['partials']> = {};
  for (const p of await fsPromise.readdir(dir)) {
    const { name, ext } = path.parse(p);
    if (ext === '.hbs') {
      partials[name] = () => fs.readFileSync(path.join(dir, p), 'utf8');
    }
  }
  return partials;
}

async function readHelpers(dir: string) {
  const h = await import(path.join(dir, 'helpers')).catch(() => undefined);
  if (h === undefined) {
    return undefined;
  }
  const helpers: NonNullable<Templates['helpers']> = {};
  for (const name in h) {
    if (typeof h[name] === 'function') {
      helpers[name] = h[name];
    }
  }
  return helpers;
}

/**
 * Reads all built-in themes into an object. Partials will always be found in
 * src/themes, whereas helpers may instead be found in dist/themes if TypeScript
 * can't be imported directly.
 */
async function readThemes(): Promise<Record<string, Templates>> {
  const themes: Record<string, Templates> = {};

  const srcThemes = path.resolve(__dirname, '../src/themes');
  const distThemes = path.resolve(__dirname, 'themes');

  for (const theme of await fsPromise.readdir(srcThemes)) {
    const templates = await readTemplates(path.join(srcThemes, theme));
    if (templates.helpers === undefined) {
      templates.helpers = await readHelpers(path.join(distThemes, theme));
    }
    themes[theme] = templates;
  }

  return themes;
}
