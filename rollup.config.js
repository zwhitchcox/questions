import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import json from 'rollup-plugin-json'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'

const production = !process.env.ROLLUP_WATCH;

export default [
  {
    input: 'src/server.js',
    output: {
      file: 'build/server.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      json(),
      resolve(),
      commonjs({include: 'node_modules/**'}),
      globals(),
    ]
  },
    {
      input: 'src/client.js',
      output: {
        file: 'build/public/client.js',
        format: 'umd',
        name: 'questions',
        sourcemap: true
      },
      plugins: [
        json(),
        resolve({browser: true}),
        commonjs({include: 'node_modules/**'}),
        babel(),
        replace({
          'process.env.NODE_ENV': false,
        })
      ]
    }
]
