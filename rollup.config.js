import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify';

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'src/main.js',
    output: {
      file: 'public/bundle.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      production && uglify()
    ]
  },
]
