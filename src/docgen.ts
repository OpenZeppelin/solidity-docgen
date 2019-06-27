import yaml from 'js-yaml';
import path from 'path';
import pEvent from 'p-event';
import { object as intoStream } from 'into-stream';
import Vinyl from 'vinyl';
import vfs from 'vinyl-fs';

import { compile } from './compile';
import { SoliditySource } from './solidity';
import { Page } from './page';

type FSVinyl = Vinyl & { contents: Buffer };

interface Options {
  contractsDir: string;
  outDir: string;
  ignore: string[];
}

export async function docgen(options: Options) {
  const solcOutput = await compile(options.contractsDir, options.ignore);
  const source = new SoliditySource(solcOutput);

  const glob = path.join(options.contractsDir, '**/README.*');
  const readmes = (await destream<FSVinyl>(vfs.src(glob)));
  const pages = readmes.map((file) => {
      const { frontmatterData, intro } = parsePage(file.contents.toString());
      return new Page(
        file.relative,
        frontmatterData,
        intro,
        source,
      );
    });

  const renderedPages = pages.map((p, i) => {
    const f = readmes[i].clone();
    f.stem = path.basename(f.dirname)
    f.dirname = path.dirname(f.dirname);
    f.contents = Buffer.from(template(p));
    return f;
  });

  // renderedPages.map(rp => crosslink(rp, pages));

  await finished(
    intoStream(renderedPages)
    .pipe(vfs.dest(options.outDir))
  );
}

function parsePage(contents: string): { frontmatterData: {}, intro: string } {
  const match = <RegExpMatchArray> // this regexp will always match
    contents.match(/^(?:---\n([^]*?\n)---\n)?([^]*)/);
  const frontmatterData = match ? yaml.safeLoad(match[1]) : {};
  const intro = match[2];
  return { frontmatterData, intro };
}

function template(page: Page): string {
  return page.path;
}

function destream<T>(stream: NodeJS.ReadableStream): Promise<T[]> {
  const res: T[] = [];
  stream.on('data', obj => res.push(obj));
  return new Promise((resolve, reject) => {
    stream.on('end', () => resolve(res));
    stream.on('error', err => reject(err));
  });
}

function finished(stream: NodeJS.ReadableStream | NodeJS.WritableStream): Promise<void> {
  return pEvent(stream, 'end');
}
