const path = require("path");

module.exports = {
  entry: {
    getPaldeaList: 'getPaldeaList.ts'
  },
  mode: "development",
  devtool: 'source-map',
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
};
