export default {
  ignoredByWatcher: [
    '**/*.{ts,d.ts,d.ts.map,tsbuildinfo}',
    'fixtures/*/output',
  ],
  typescript: { rewritePaths: { 'src/': 'dist/' } },
  verbose: true,
  timeout: '1m',
};
