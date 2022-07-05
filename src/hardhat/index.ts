import { extendConfig, task } from 'hardhat/config';
import { BuildInfo } from 'hardhat/types';

import './type-extensions';

extendConfig((config, userConfig) => {
  const path = require('path') as typeof import('path');
  config.docgen ??= {};
  config.docgen.root = config.paths.root;
  config.docgen.sourcesDir = path
    .relative(config.paths.root, config.paths.sources)
    .split(path.sep)
    .join(path.posix.sep);
});

task('docgen', async (_, hre) => {
  await hre.run('compile');

  const { promises: fs } = await import('fs');
  const { main } = await import('../main');

  const buildInfoPaths = await hre.artifacts.getBuildInfoPaths();
  const builds: BuildInfo[] = await Promise.all(
    buildInfoPaths.map(async p => JSON.parse(await fs.readFile(p, 'utf8'))),
  );

  await main(builds, hre.config.docgen);
});
