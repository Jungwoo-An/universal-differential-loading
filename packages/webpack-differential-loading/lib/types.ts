import { Configuration } from 'webpack'

export type BuildType = 'modern' | 'legacy'

export interface IHtmlTag {
  attributes: {
    [attributeName: string]: string | boolean
  }
  tagName: string
  voidTag: boolean
}

export type ConfigurationFunctionType = (mode: BuildType) => Configuration
