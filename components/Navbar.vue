<script>
import NavLink from "./NavLink.vue";

export default {
    props: {
        currentPage: String
    },
    components: { NavLink },
	data() {
		return {
			pages: [
				'about',
				'projects',
				'contact'
			],
			bioLinks: [
				{iconClass: 'fab fa-twitter', url: 'https://twitter.com/adoryvo'},
				{iconClass: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/adoryvo'},
				{iconClass: 'fab fa-github', url: 'https://github.com/AdoryVo'},
			]
		}
	}
}
</script>

<template>
	<header id="navbar" class="bg-slate-900 border-b-2 border-slate-500 w-full">
		<nav class="flex flex-wrap container items-center justify-between lg:w-2/3 text-blue-200 mx-auto py-5">
			<div id="navLinks" class="flex items-center uppercase text-sm">
				<a href="/" class="hover:scale-90 transition-transform duration-500 mr-4">
					<img class="w-12 md:w-14" src="/images/favicon-64x64.png" alt="logo" />
				</a>
				<NavLink v-for="page of pages" :to="page" :currentPage="currentPage" :key="page">{{ page }}</NavLink>
			</div>

			<div id="bioLinks">
				<a v-for="bioLink of bioLinks" :href="bioLink.url" :key="bioLink" class="hover:text-blue-100 ml-3" target="_blank">
					<i :class="bioLink.iconClass"></i>
				</a>
			</div>
		</nav>
	</header>
</template>