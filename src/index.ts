export { main as docgen } from './main';
export { DocItemWithContext } from './site';

import './hardhat/type-extensions';

if ('extendConfig' in global && 'task' in global) {
  // Assume Hardhat.
  require('./hardhat');
}
