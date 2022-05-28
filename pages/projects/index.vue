<script>
export default {
	setup() {
		const wipPages = reactive([
					{title: 'Check Splitter', path: 'check-splitter'},
					{title: 'Restaurant Roulette', path: 'restaurant-roulette'},
				]);
	
		return { wipPages }
	},
}
</script>

<template>
	<main>
		<BodyTitle>projects</BodyTitle>
		<p class="mb-6">
			This page is a work in progress - visit 
			<NuxtLink class="link-light" to="https://adoryvo.github.io/projects/index.html" target="_blank">my old website</NuxtLink> 
			to see my projects there. Come back soon!
		</p>

		<BodyHeading class="mb-2">Work In Progress</BodyHeading>
		<ul class="list-disc list-inside">
			<li v-for="page of wipPages">
				<NuxtLink class="link-primary" :to="`/projects/${page.path}`">{{ page.title }}</NuxtLink>
			</li>
		</ul>
	</main>
</template>