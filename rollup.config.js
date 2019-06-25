import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const isBrowser = String(process.env.NODE_ENV).includes('browser')

const targets = isBrowser ? 'ie >= 9' : { node: 8 }
const input = `src/index.js`
const output = isBrowser
	? [
		{ file: `browser.js`, format: 'esm', sourcemap: false, strict: false, name: 'defineArgs' },
		{ file: `browser.mjs`, format: 'esm', sourcemap: false, strict: false, name: 'defineArgs' }
	]
: [
	{ file: `index.js`, format: 'cjs', sourcemap: true, strict: false },
	{ file: `index.mjs`, format: 'esm', sourcemap: true, strict: false }
]
const plugins = [
	babel({
		presets: [
			['@babel/env', {
				corejs: 3,
				loose: true,
				modules: false,
				targets,
				useBuiltIns: 'entry'
			}]
		]
	})
].concat(isBrowser
	? [
		terser(),
		rewriteForBrowser()
	]
: [])

export default { input, output, plugins }

function rewriteForBrowser () {
	return {
		name: 'trim-content-for-browser',
		renderChunk (code, opts) {
			if (opts.fileName === 'browser.js') {
				code = code.replace(/^export default function/, 'function defineArgs')
			}

			return code
		}
	}
}
