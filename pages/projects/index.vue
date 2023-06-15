<script>
export default {
	setup() {
		const styles = {
			major: 'font-bold'
		}

		const completePages = reactive([
					{title: 'Anagram Finder', path: '/projects/anagram-finder'},
					{title: 'Big Two (online card game)', path: 'https://bigtwo.vercel.app', target: '_blank', classes: styles.major},
					{
						title: 'Data Science w/ Python: Analyzing the Impact of Weather on Baseball Players', 
						path: 'https://github.com/AdoryVo/baseball-weather-impact/blob/master/FinalProject_group031.ipynb', 
						target: '_blank'
					},
					{title: 'Freelancing Web Development Projects', path: '/projects/freelancing'},
					{title: 'Pokésearch', path: 'https://github.com/AdoryVo/pokesearch#-pokesearch', target: '_blank'},
					{
						title: 'Team Ocean\'s Recipe Manager', 
						path: 'https://github.com/AdoryVo/team-ocean-recipe-manager#-team-oceans-recipe-manager', 
						target: '_blank', 
						classes: styles.major
					},
					{title: 'UCSD Schedule Calendarizer', path: 'https://adoryvo.github.io/calendarize-webreg/', target: '_blank'},
				]);

		const wipPages = reactive([
					{title: 'Check Splitter', path: '/projects/check-splitter'},
					{title: 'Poketeam', path: 'https://github.com/AdoryVo/poketeam', target: '_blank'},
					{title: 'Restaurant Roulette', path: '/projects/restaurant-roulette'},
					{title: 'Streetspot', path: 'https://streetspot.netlify.app', target: '_blank', classes: styles.major},
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
				<NuxtLink :class="`link-light ${page.classes}`" :to="`${page.path}`" :target="page.target">{{ page.title }}</NuxtLink>
			</li>
		</ul>

		<BodyHeading>Work In Progress</BodyHeading>
		<ul class="list-disc list-inside">
			<li v-for="page of wipPages">
				<NuxtLink :class="`link-light ${page.classes}`" :to="`${page.path}`" :target="page.target">{{ page.title }}</NuxtLink>
			</li>
		</ul>
	</main>
</template>