const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
	watch : true,
  mode : "development",
	target: 'electron-renderer',
	context : path.resolve(__dirname), // make all relative path relative to this instead of cwd
  entry : {
    main : "./src/app.js" // chunkname : "path to start bundling this chunk"
  },
  output : {
    filename : "[name].[chunkhash].js", // name of the outputed files
    path : path.resolve(__dirname, "build"), // where to put those files
    publicPath : "" // the address seen from the web URL, after the domain
  },
  devtool: "cheap-source-map",
	module : {
    rules : [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true, // turn css selectors into hashes
              camelCase: true,
              sourceMap: true
            }
          }
        ]
      },
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			}
    ]
  },
  plugins : [
		new CleanWebpackPlugin(path.resolve(__dirname, "./build")),
    new MiniCssExtractPlugin({
      filename: "[name].css", // sync chunk
      chunkFilename: "[id].css" // async chunk
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ]
};
