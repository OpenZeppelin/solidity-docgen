import handlebars from 'handlebars';

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
        return [...arguments].every(Boolean);
    },
    or: function () {
        return [...arguments].some(Boolean);
    }
});

export type Template<Context> = (context: Context) => string;

export function compile(template: string): Template<unknown> {
  return H.compile(template, { noEscape: true });
}

export function slug(str: string): string {
  return str.replace(/\W/g, '-');
}
