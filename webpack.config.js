const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          "ts-loader"
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    minimize: false,
    minimizer: [
      // Webpack 5 打包自动生成license文件, 通过自定义配置来规避此问题
      new TerserPlugin({
        // https://www.npmjs.com/package/terser-webpack-plugin
        extractComments: /@extract/i, // 防止is-buffer库的@license的信息被导出来，限制一下 
      }),
    ],
  },
  output: {
    filename: "baiduTranslateService.js",
    path: path.resolve(__dirname, "lib"),
    libraryTarget: "umd",
    libraryExport: "default",
    globalObject: "this",
    library: "baiduTranslateService",
    clean: true,
  },
};

