import { build } from 'esbuild'

import { main, module, dependencies } from '../package.json'

import { resolve } from 'path'

import type { BuildOptions } from 'esbuild'

const sharedOptions: BuildOptions = {
  entryPoints: [resolve(__dirname, '..', 'lib', 'index.ts')],
  platform: 'node',
  bundle: true,
  minify: true,
  sourcemap: true,
  external: Object.keys(dependencies)
}

build({
  ...sharedOptions,
  format: 'esm',
  outfile: module
})

build({
  ...sharedOptions,
  format: 'cjs',
  outfile: main
})
