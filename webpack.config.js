module.exports = {
  entry: [
    __dirname + '/src/js/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    root: __dirname + '/src/js',
    extensions: ['', '.js']
  },
  devServer: {
    contentBase: './dist',
  },
  debug: true,
  devtool: "source-map"
}
