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
			}
		}
	}
});
