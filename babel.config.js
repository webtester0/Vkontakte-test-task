const devPlugins = [
  require("react-hot-loader/babel"),
  require("babel-plugin-styled-components")
];

const cssModules = [
  "react-css-modules",
  {
    filetypes: {
      ".scss": {
        syntax: "postcss-scss",
        plugins: ["postcss-nested"]
      }
    },
    generateScopedName: "[local]__[hash:base64:5]",
    webpackHotModuleReloading: true,
    autoResolveMultipleImports: true
  }
];

module.exports = api => {
  const env = api.cache(() => process.env.NODE_ENV);
  const development = api.env("development");

  return {
    presets: [
      [require("@babel/preset-env"), { targets: "last 3 versions, ie 11" }],
      require("@babel/preset-react"),
      require("linaria/babel"),
      require("babel-preset-react-hmre")
    ],

    plugins: [
      ...(development ? devPlugins : []),
      cssModules,
      [require("@babel/plugin-proposal-decorators"), { legacy: true }],
      require("@babel/plugin-proposal-export-default-from"),
      [require("@babel/plugin-proposal-class-properties", { loose: true })],
      require("@babel/plugin-transform-async-to-generator"),
    ]
  };
};
