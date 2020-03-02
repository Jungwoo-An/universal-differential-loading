import WebpackDifferentialLoading from './WebpackDifferentialLoading'

import { ConfigurationFunctionType } from './types'

export function setup(makeConfiguration: ConfigurationFunctionType) {
  const legacyConfig = makeConfiguration('legacy')
  const modernConfig = makeConfiguration('modern')

  const legacyPlugins = legacyConfig.plugins || (legacyConfig.plugins = [])
  const modernPlugins = modernConfig.plugins || (modernConfig.plugins = [])

  legacyPlugins.push(new WebpackDifferentialLoading('legacy'))
  modernPlugins.push(new WebpackDifferentialLoading('modern'))

  return [legacyConfig, modernConfig]
}
