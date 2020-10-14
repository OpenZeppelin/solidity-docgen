export default {
  ignoredByWatcher: [
    '**/*.{ts,map,tsbuildinfo}',
    'fixtures/*/output',
  ],
  typescript: { rewritePaths: { 'src/': 'dist/' } },
  verbose: true,
  timeout: '1m',
};
