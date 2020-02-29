import { IHtmlTag, BuildType } from './types'

export function updateHtmlTag({
  tag,
  mode
}: {
  tag: IHtmlTag
  mode: BuildType
}) {
  const { attributes, ...restTagData } = tag

  return {
    ...restTagData,
    attributes: {
      ...attributes,
      ...(mode === 'legacy' && { nomodule: true }),
      ...(mode === 'modern' && { type: 'module' })
    }
  }
}
