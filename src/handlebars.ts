import handlebars from 'handlebars';

const H = handlebars.create();
H.registerHelper('slug', slug);

export type Template<Context> = (context: Context) => string;

export function compile(template: string): Template<unknown> {
  return H.compile(template, { noEscape: true });
}

export function slug(str: string): string {
  return str.replace(/\W/g, '-');
}
