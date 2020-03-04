const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { createFsFromVolume, Volume } = require('memfs')
const { JSDOM } = require('jsdom')

const { setup } = require('../../dist/webpack-differential-loading')

describe('WebpackDifferentialLoading', () => {
  it('should add module and nomodule attribute', done => {
    const config = setup(mode => ({
      name: mode,
      entry: path.resolve(__dirname, '../fixtures/app.js'),
      output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: 'bundle.js'
      },
      plugins: [new HtmlWebpackPlugin()]
    }))

    const compiler = webpack(config, (err, result) => {
      expect(err).toBeFalsy()
      expect(result.hasErrors()).toBeFalsy()

      const stat = result.stats.sort(
        (stat1, stat2) => stat2.endTime - stat1.endTime
      )[0]

      const html = stat.compilation.assets['index.html'].source()
      const dom = new JSDOM(html)

      const moduleScripts = dom.window.document.querySelectorAll(
        'script[type="module"]'
      )
      const nomoduleScripts = dom.window.document.querySelectorAll(
        'script[nomodule]'
      )

      expect(moduleScripts.length).toEqual(nomoduleScripts.length)

      done()
    })
    const outputFileSystem = createFsFromVolume(new Volume())
    outputFileSystem.join = path.join.bind(path)
    compiler.outputFileSystem = outputFileSystem
  })
})
