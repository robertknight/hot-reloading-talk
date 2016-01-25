module.exports = {
  entry: './src/index',
  output: {
    filename: 'bundle.js',
    path: './build/',
    publicPath: '/build/',
  },
  module: {
    loaders: [
      { test: /\.jsx?/, loader: 'babel', include: /src\/.*/ },
      { test: /\.css?/, loader: 'style!css' },
    ]
  },
  plugins: [
  ]
};
