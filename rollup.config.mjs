import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/p5.woff2.js',
  output: {
    file: 'lib/p5.woff2.js',
    format: 'umd',
    name: 'woff2',
    globals: {
      p5: 'p5',
    },
  },
  external: ['p5'],
  plugins: [commonjs({
    transformMixedEsModules: true,
  }), nodeResolve()],
};
