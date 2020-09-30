const path = require('path');

module.exports = {
  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'javascripts/bundle.js'
  },

  mode : 'development',  // 'production'
  devtool: 'eval-source-map',

  module: {
   rules: [
     {
       test: /\.js$/,
       exclude: (/node_modules/),
       use: [
          { loader: 'babel-loader' }
       ]
     },
     {
        test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader'}
        ]
      },
     {
       test: /\.(png|jpg|gif)$/,
       use: [
         {
           loader: 'file-loader',
           options: {
              name : '[name].[ext]',
             outputPath : 'images'
           }
         }
       ]
     }
   ]
 }
};
