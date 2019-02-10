const path = require('path');

function resolveSnapshotPath(builtTestPath, snapshotExtension) {
  const testPath = path.relative('build', builtTestPath);

  const res = path.resolve(
    path.dirname(testPath),
    '__snapshots__',
    path.basename(testPath) + snapshotExtension,
  );
  return res;
}

function resolveTestPath(snapshotPath, snapshotExtension) {
  const relativeSnapshotPath = path.relative('.', snapshotPath);

  const res = path.resolve(
    'build',
    path.dirname(relativeSnapshotPath),
    '..',
    path.basename(relativeSnapshotPath, snapshotExtension),
  );
  return res;
}

const testPathForConsistencyCheck = path.resolve(
  'build',
  'consistency_check',
  '__tests__',
  'example.test.js',
);

module.exports = {
  resolveSnapshotPath,
  resolveTestPath,
  testPathForConsistencyCheck,
};
