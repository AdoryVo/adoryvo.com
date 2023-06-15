<script>
export default {
	setup() {
		const projects = reactive([
					{
						title: '3056Brunswick',
						path: 'https://3056brunswick.netlify.app/html/', 
						completedAt: 'November 2019'
					},
					{
						title: 'CloudPizza Dallas', 
						path: 'https://cloudpizzadallas.up.railway.app/', 
						completedAt: 'October 2020'
					},
					{
						title: 'Graphic Designer Portfolio', 
						path: 'https://adorsey.netlify.app/html/',
						completedAt: 'October 2019'
					},
					{
						title: 'Revenite Debt Accountability Program', 
						path: 'https://debt.revenite.rocks/', 
						completedAt: 'November 2021'
					},
					{
						title: 'Valtourneys', 
						path: 'https://alectrify.github.io/portfolio/valtourneys/', 
						completedAt: 'October 2020'
					}
				]);
	
		return { projects }
	},
}
</script>

<template>
	<main>
		<BodyTitle class="mb-0">freelancing</BodyTitle>
		<b class="text-green-400">Completed: June 2019 - February 2022</b>
		<p class="my-4">
			Projects completed for freelance clients on Fiverr & Upwork.
			<br>
			<i>- Done in partnership with Ryan Heo</i>
		</p>

		<ul class="list-disc list-inside">
			<li v-for="project of projects">
				<NuxtLink class="link-light" :to="`${project.path}`" target="_blank">{{ project.title }}</NuxtLink>
				({{ project.completedAt }})
			</li>
		</ul>
	</main>
</template>