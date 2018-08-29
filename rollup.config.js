import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'MockScript'
  },
  plugins: [
    resolve(),
    commonJS({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**',
    })
  ],
  dest: 'dist/bundle.js'
};