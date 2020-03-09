<h3 align="center">webpack-differential-loading</h3>
<p align="center">The easiest way to configure differential-loading</p>

## Instroduction

webpack-differential-loading is webpack plugin for differential loading idea. it make complicated and difficult things to easy.

It was inspired by [angular website](https://angular.io/guide/deployment#differential-loading)

## Getting Started

### Prerequisites

- webpack@^4
- html-webpack-plugin

### Installation

Inside your project that configured by webpack, run the following

```bash
# Install via npm
$ npm install -D webpack-differential-loading

# install via yarn
$ yarn add -D webpack-differential-loading
```

## Usage

```ts
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { setup } = require('webpack-differential-loading');

module.exports = setup((mode) => {
  entry: './src/index.js',
  output: {
    filename: mode === 'legacy' ? 'bundle.legacy.js' : 'bundle.modern.js',
  },
  plugins: [new HtmlWebpackPlugin()],
  resolve: {
    alias: {
      ...(mode === 'modern' && { '@': 'modern' }),
      ...(mode === 'legacy' && { '@': 'legacy' }),
    },
  },
})
```

### API

```ts
function setup(func: (mode: 'legacy' | 'modern') => Webpack.Configuration): Webpack.Configuration[]:
```