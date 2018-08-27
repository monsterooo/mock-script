import babel from 'rollup-plugin-babel';

const babelConfig = {
  'presets': [
    ['env', {
      'targets': {
        'browsers': ['last 2 versions']
      },
      'loose': true
    }]
  ]
};

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'MockScript'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    })
  ],
  dest: 'dist/bundle.js'
};