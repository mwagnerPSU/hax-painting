import nodeResolve from '@rollup/plugin-node-resolve';
import html from '@web/rollup-plugin-html';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';

export default {
	input: 'index.html',
	output: [
		{
			format: 'es',
            dir: 'dist'
		}
	],
    plugins: [
        html({
            minify: true,
            injectServiceWorker: process.env.VERCEL_ENV == "development" ? false : true,
            serviceWorkerPath: 'dist/sw.js',
        }),
        nodeResolve(),
        importMetaAssets()
    ]
};