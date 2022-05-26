import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	css: [
		'@/assets/css/imports.scss'
	],
	modules: [
		'@nuxtjs/tailwindcss'
	],
	tailwindcss: {
		cssPath: '~/assets/css/main.scss',
		viewer: false
	},
	typescript: {
		shim: false,
	},
});
