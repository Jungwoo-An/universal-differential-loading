import fs from 'fs'
import path from 'path'

import typescript from 'rollup-plugin-typescript2'

const packages = (fs.readdirSync(path.resolve('./packages')) || []).reduce(
  (result, item) => {
    const fullPath = path.resolve(`./packages/${item}`)
    const isDirectory = fs.statSync(fullPath).isDirectory()
    if (!isDirectory) {
      return result
    }

    result.push(fullPath)

    return result
  },
  []
)

export default packages.map(dir => {
  const FILENAME = `${dir}/dist/${path.basename(dir)}`
  return {
    input: `${dir}/lib/index.ts`,
    output: [
      {
        file: `${FILENAME}.es.js`,
        format: 'es',
        sourcemap: true
      },
      {
        file: `${FILENAME}.js`,
        format: 'cjs',
        sourcemap: true
      }
    ],
    plugins: [typescript()]
  }
})
