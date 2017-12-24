const path = require('path')

// plugins
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CopyPlugin([
      // copy assets to dist
      { from: './assets', to: './assets', ignore: ['./assets/index.html'] },
      { from: './assets/index.html', to: './index.html' }
    ])
  ],
  devServer: {
    contentBase: './dist'
  }
}
