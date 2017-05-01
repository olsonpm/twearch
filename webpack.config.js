'use strict';

const path = require('path');

module.exports = {
  target: 'node'
  , context: __dirname
  , entry: './index.js'
  , output: {
    path: __dirname
    , filename: 'index.pack.js'
    , pathinfo: true
    , libraryTarget: 'commonjs2'
  }
  , module: {
    loaders: [{
      test: /\.json$/
      , loader: 'json-loader'
    }]
  }
  , externals: [{ vertx: true }, /\.ts$/]
  , node: { __dirname: false }
};
