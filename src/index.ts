export * from './main';

if ('extendConfig' in global && 'task' in global) {
  // Assume Hardhat.
  require('./hardhat');
}
