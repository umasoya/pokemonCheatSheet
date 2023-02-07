const path = require("path");

const node = {
  mode: "development",
  entry: {
    getPaldeaList: 'getPaldeaList.ts'
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: '[name].js',
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      "node_modules",
    ],
    extensions: [".ts", ".js"],
    fallback: { fs: false },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      }
    ],
  },
  target: 'node',
  devtool: 'source-map',
};

const app = {
  mode: "development",
  entry: './frontend/src/index.tsx',
  resolve: {
    modules: [
      path.resolve('./frontend/src'),
      "node_modules",
    ],
    extensions: [".ts", ".tsx", ".js", "jsx"],
  },
  output: {
    path: path.join(__dirname, "frontend/dist"),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx+$/,
        loader: "ts-loader",
      }
    ],
  },
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    static: {
      directory: path.join(__dirname, 'frontend/'),
    },
    open: true,
    port: 3000,
    watchFiles: [
      'frontend/src/*.tsx'
    ],
  },
};

module.exports = [
  app, node
];