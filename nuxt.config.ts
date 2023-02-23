// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	css: [
		'@/assets/css/imports.scss'
	],
	modules: [
		'@nuxtjs/tailwindcss',
		'@nuxt/image-edge'
	],
	tailwindcss: {
		cssPath: '~/assets/css/main.scss',
		viewer: false
	},
	typescript: {
		shim: false,
	},
	app: {
		head: {
			htmlAttrs: {
				lang: 'en'
			},
			script: [
				{ src: 'https://code.jquery.com/jquery-3.6.0.min.js' },
				{ src: 'https://cdn.jsdelivr.net/npm/luxon@2.4.0/build/global/luxon.min.js' }
			]
		}
	}
});
