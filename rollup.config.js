import typescript from 'rollup-plugin-typescript2'

const FILENAME = 'dist/webpack-differential-loading'

export default {
  input: 'lib/index.ts',
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
