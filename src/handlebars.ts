import handlebars, { HelperDeclareSpec } from 'handlebars';

const H = handlebars.create();
H.registerHelper('slug', slug);
H.registerHelper({
    eq: function (v1, v2) {
        return v1 === v2;
    },
    ne: function (v1, v2) {
        return v1 !== v2;
    },
    lt: function (v1, v2) {
        return v1 < v2;
    },
    gt: function (v1, v2) {
        return v1 > v2;
    },
    lte: function (v1, v2) {
        return v1 <= v2;
    },
    gte: function (v1, v2) {
        return v1 >= v2;
    },
    and: function () {
        return [...arguments].slice(0, -1).every(Boolean);
    },
    or: function () {
        return [...arguments].slice(0, -1).some(Boolean);
    }
});

export type Template<Context> = (context: Context) => string;

export function registerHelpers(helpers: HelperDeclareSpec) {
  H.registerHelper(helpers);
};

export function compile(template: string): Template<unknown> {
  const compiledTemplate = H.compile(template, { noEscape: true });
  return context => compiledTemplate(context, {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
  });
}

export function slug(str: string): string {
  return str.replace(/\W/g, '-');
}
