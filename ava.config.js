export default {
  ignoredByWatcher: [
    '**/*.{ts,map,tsbuildinfo}',
    'fixtures/*/output',
  ],
  typescript: {
    rewritePaths: { 'src/': 'dist/' },
    compile: false,
  },
  verbose: true,
  timeout: '3m',
};
