<script>
export default {
	setup() {
		const completePages = reactive([
					{title: 'Anagram Finder', path: '/projects/anagram-finder'},
					{title: 'Pokésearch', path: 'https://github.com/AdoryVo/pokesearch#-pokesearch', target: '_blank'},
					{title: 'Recipe Manager', path: 'https://github.com/AdoryVo/team-ocean-recipe-manager#-team-oceans-recipe-manager', target: '_blank'},
					{title: 'UCSD Schedule Calendarizer', path: 'https://adoryvo.github.io/calendarize-webreg/', target: '_blank'},
				]);

		const wipPages = reactive([
					{title: 'Check Splitter', path: '/projects/check-splitter'},
					{title: 'Restaurant Roulette', path: '/projects/restaurant-roulette'},
					{title: 'Streetspot', path: 'https://github.com/AdoryVo/streetspot', target: '_blank'},
				]);
	
		return { completePages, wipPages }
	},
}
</script>

<template>
	<main>
		<BodyTitle>projects</BodyTitle>
		<p class="mb-6">
			This page is a work in progress - visit 
			<NuxtLink class="link-light" to="https://adoryvo.github.io/projects/index.html" target="_blank">my old website</NuxtLink> 
			to see some older projects.
		</p>

		<BodyHeading>Complete</BodyHeading>
		<ul class="list-disc list-inside mb-5">
			<li v-for="page of completePages">
				<NuxtLink class="link-primary" :to="`${page.path}`" :target="page.target">{{ page.title }}</NuxtLink>
			</li>
		</ul>

		<BodyHeading>Work In Progress</BodyHeading>
		<ul class="list-disc list-inside">
			<li v-for="page of wipPages">
				<NuxtLink class="link-primary" :to="`${page.path}`" :target="page.target">{{ page.title }}</NuxtLink>
			</li>
		</ul>
	</main>
</template>