module.exports = {
  entry: __dirname + '/client/src/renderPhotoService.jsx',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
   filename: 'bundle.js',
   path: __dirname + '/public'
  },
  apps: [{
    name: "client-jason_FEC_service",
    script: "./public/bundle.js",
    watch: true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
      "NODE_ENV": "production"
    }
  },
  {
    name: "api-jason_FEC_service",
    script: "./server/index.js",
    watch: true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
     "NODE_ENV": "production"
    }
  }]
};