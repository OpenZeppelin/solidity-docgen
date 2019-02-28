const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        "node": "8",
      },
    }
  ],
  '@babel/preset-react',
];

module.exports = {
  presets,
};
