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

const plugins = [
  '@babel/plugin-proposal-object-rest-spread',
];

module.exports = {
  presets,
  plugins,
};
