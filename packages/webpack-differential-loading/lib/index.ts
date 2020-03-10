import { Configuration } from 'webpack'

import { ConfigurationFunctionType } from './types'
import { WebpackDifferentialLoadingPlugin } from './WebpackDifferentialLoadingPlugin'

export function setup(
  makeConfiguration: ConfigurationFunctionType
): Configuration[] {
  const legacyConfig = makeConfiguration('legacy')
  const modernConfig = makeConfiguration('modern')

  const legacyPlugins = legacyConfig.plugins || (legacyConfig.plugins = [])
  const modernPlugins = modernConfig.plugins || (modernConfig.plugins = [])

  legacyPlugins.push(new WebpackDifferentialLoadingPlugin('legacy'))
  modernPlugins.push(new WebpackDifferentialLoadingPlugin('modern'))

  return [legacyConfig, modernConfig]
}
