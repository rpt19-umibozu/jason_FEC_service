module.exports = {
  entry: __dirname + '/client/src/app.jsx',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-react', '@babel/preset-env', '@babel/react', '@babel/es2015'],
              plugins: ['@babel/proposal-class-properties']
          }
        }
      }
    ]
  },
  output: {
   filename: 'bundle.js',
   path: __dirname + '/client/dist'
 }
};