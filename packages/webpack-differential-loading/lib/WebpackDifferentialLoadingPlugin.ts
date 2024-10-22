import { Plugin, Compiler } from 'webpack'

import * as HtmlWebpackPlugin from 'html-webpack-plugin'

import { BuildType, IHtmlTag } from './types'
import { store } from './store'
import { updateHtmlTag } from './utils'

class WebpackDifferentialLoadingPlugin implements Plugin {
  private _mode: BuildType

  constructor(mode: BuildType) {
    this._mode = mode
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(this.constructor.name, compilation => {
      const hooks = compilation.hooks as HtmlWebpackPlugin.Hooks
      hooks.htmlWebpackPluginAlterAssetTags.tapPromise(
        this.constructor.name,
        this.updateAssetTags
      )
    })
  }

  updateTag = (tag: IHtmlTag) => {
    if (tag.tagName !== 'script') {
      return tag
    }

    return updateHtmlTag({ mode: this._mode, tag })
  }

  updateAssetTags = async (htmlPluginData: {
    head: IHtmlTag[]
    body: IHtmlTag[]
    outputName: string
    plugin: HtmlWebpackPlugin
  }) => {
    const hasPreviousBuildAssetTags =
      store.recentlyAssetTags.head.length > 0 ||
      store.recentlyAssetTags.body.length > 0

    if (!hasPreviousBuildAssetTags) {
      // first build
      store.concurrentPromise = new Promise(resolve => {
        store.recentlyAssetTags.head = htmlPluginData.head.map(this.updateTag)
        store.recentlyAssetTags.body = htmlPluginData.body.map(this.updateTag)

        resolve()
      })

      return htmlPluginData
    }

    // last build
    const result = {
      ...htmlPluginData,
      head: htmlPluginData.head.map(this.updateTag),
      body: htmlPluginData.body.map(this.updateTag)
    }

    const merge =
      this._mode === 'legacy' ? Array.prototype.unshift : Array.prototype.push

    await store.concurrentPromise

    merge.apply(result.head, store.recentlyAssetTags.head)
    merge.apply(result.body, store.recentlyAssetTags.body)

    return result
  }
}

export { WebpackDifferentialLoadingPlugin }
