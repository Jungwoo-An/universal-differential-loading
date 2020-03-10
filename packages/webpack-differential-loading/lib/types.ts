import { Configuration } from 'webpack'

export type BuildType = 'modern' | 'legacy'

export interface IHtmlTag {
  attributes: {
    [attributeName: string]: string | boolean
  }
  tagName: string
  voidTag: boolean
}

export interface IStore {
  recentlyAssetTags: {
    head: IHtmlTag[]
    body: IHtmlTag[]
  }
  concurrentPromise: Promise<void> | null
}

export type ConfigurationFunctionType = (mode: BuildType) => Configuration
