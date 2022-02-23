import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	buildModules: [
		'@nuxtjs/tailwindcss'
	],
	css: [
		'@/assets/css/main.scss'
	],
	typescript: {
		shim: false,
	},
});
