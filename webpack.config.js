const isDevelopment = process.env.NODE_ENV === 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: "production",

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".scss"]
  },

  module: {
      rules: [
          {
              test: /\.ts(x?)$/,
              exclude: /node_modules/,
              use: [
                  {
                      loader: "ts-loader"
                  }
              ]
          },
          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          {
              enforce: "pre",
              test: /\.js$/,
              loader: "source-map-loader"
          },
          {
            test: /\.module\.s(a|c)ss$/,
            loader: [
              isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  sourceMap: isDevelopment
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: isDevelopment
                }
              }
            ]
          },
          {
            test: /\.s(a|c)ss$/,
            exclude: /\.module.(s(a|c)ss)$/,
            loader: [
              isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: isDevelopment
                }
              }
            ]
          }
      ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    })
  ],

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  }
};