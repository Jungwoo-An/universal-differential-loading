export type BuildType = 'modern' | 'legacy'

export interface IHtmlTag {
  attributes: {
    [attributeName: string]: string | boolean
  }
  tagName: string
  voidTag: boolean
}
