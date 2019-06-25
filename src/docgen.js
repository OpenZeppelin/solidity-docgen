import vfs from 'vinyl-fs';

export async function docgen() {
  const solcOutput = await compile();
  const source = new SoliditySource(solcOutput);

  const pages = (await destream(vfs.src('**/README.md')))
    .map(path => {
      const { frontmatterData, intro } = parsePage(path.contents);
      return new Page(
        path,
        frontmatterData,
        intro,
        source,
      );
    });

  const renderedPages = pages.map(p => ({
    path: p.path,
    contents: template(p),
  }));

  // renderedPages.map(rp => crosslink(rp, pages));
}

function destream(stream) {
  const res = [];
  stream.on('data', obj => res.push(obj));
  return new Promise((resolve, reject) => {
    stream.on('end', () => resolve(res));
    stream.on('error', err => reject(err));
  });
}
