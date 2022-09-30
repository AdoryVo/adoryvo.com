<script>
export default {
	setup() {
		const completePages = reactive([
					{title: 'Anagram Finder', path: 'anagram-finder'},
				]);

		const wipPages = reactive([
					{title: 'Check Splitter', path: 'check-splitter'},
					{title: 'Restaurant Roulette', path: 'restaurant-roulette'},
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
			to see other projects there. Come back soon!
		</p>

		<BodyHeading>Complete</BodyHeading>
		<ul class="list-disc list-inside mb-5">
			<li v-for="page of completePages">
				<NuxtLink class="link-primary" :to="`/projects/${page.path}`">{{ page.title }}</NuxtLink>
			</li>
		</ul>

		<BodyHeading>Work In Progress</BodyHeading>
		<ul class="list-disc list-inside">
			<li v-for="page of wipPages">
				<NuxtLink class="link-primary" :to="`/projects/${page.path}`">{{ page.title }}</NuxtLink>
			</li>
		</ul>
	</main>
</template>