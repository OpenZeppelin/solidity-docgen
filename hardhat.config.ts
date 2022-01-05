import type { HardhatUserConfig } from 'hardhat/config';

import './src/hardhat';

export default <HardhatUserConfig> {
  paths: {
    sources: 'test-contracts',
  },
  solidity: {
    compilers: [
      { version: '0.8.11' },
    ],
  },
  docgen: {
    output: 'docs',
    pages: () => 'api.md',
  },
};
