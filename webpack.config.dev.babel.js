import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const distPath = path.resolve(__dirname, 'example/dist');
const srcPath = path.resolve(__dirname, 'example/src');

const config = {
  entry: ['react-hot-loader/patch', 'webpack/hot/only-dev-server', path.join(srcPath, 'index.dev')],
  output: {
    path: distPath,
    filename: 'app.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [srcPath, path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        include: [srcPath, path.resolve(__dirname, 'src/lib/styles')],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=icons/[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: srcPath,
    historyApiFallback: true,
    hot: true,
    publicPath: '/',
    disableHostCheck: true,
    compress: true,
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      favicon: path.join(srcPath, 'assets/images/favicon.png'),
      hash: true,
      inject: true,
      template: path.join(srcPath, 'index.html'),
    }),
  ],
};

export default config;
