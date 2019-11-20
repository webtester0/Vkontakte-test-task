const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const analyzerMode = process.env.ANALYZE ? "server" : "disabled";

const srcPath = path.resolve(__dirname, "src", "index.js");
const buildPath = path.resolve(__dirname, "dist");
const testPath = path.resolve(__dirname, "src");

const getCSSLoader = (withModules = false) => [
  MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    options: {
      modules: withModules && {
        localIdentName: "[local]__[hash:base64:5]"
      },
      importLoaders: 1,
      sourceMap: false
    }
  },
  {
    loader: "postcss-loader",
    options: {
      plugins: [autoprefixer()]
    }
  },
  {
    loader: "sass-loader",
    options: {
      includePaths: [srcPath]
    }
  }
];

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: srcPath,
    output: {
      path: buildPath,
      filename: "bundle.[hash].js"
    },
    devtool: isProd ? "none" : "eval-source-map",
    optimization: {
      minimizer: isProd
        ? [
          new TerserPlugin({
            parallel: true,
            sourceMap: true,
            cache: true
          })
        ]
        : []
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'linaria/loader']
        },
        {
          test: /.(s?css|sass)$/,
          exclude: /\.modules\.(s?css|sass)$/,
          use: getCSSLoader(false)
        },
        {
          test: /\.modules\.(s?css|sass)$/,
          use: getCSSLoader(true)
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".scss", ".css"],
      alias: {
        components: `${testPath}/components`,
        container: path.resolve(__dirname, 'src', 'container'),
        'react-dom': '@hot-loader/react-dom',
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
        filename: "index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "[name]-[hash].css"
      }),
      new BundleAnalyzerPlugin({
        analyzerMode
      })
    ],
    devServer: {
      hot: true,
      contentBase: buildPath
    }
  };
};
