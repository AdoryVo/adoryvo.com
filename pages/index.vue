<script>
export default {
	setup() {
		definePageMeta({
			layout: false
		});

		useHead({
			title: 'adoryvo.com',
			meta: [
				{ name: 'description', content: 'Adory Vo is an aspiring software developer and educator studying Computer Science at UC San Diego in La Jolla, CA.' },
				{
					property: 'og:url',
					content: 'https://www.adoryvo.com'
				},
				{
					property: 'og:title',
					content: 'adoryvo.com'
				},
				{
					property: 'og:description',
					content: 'Adory Vo is an aspiring software developer and educator studying Computer Science at UC San Diego in La Jolla, CA.'
				},
				{
					property: 'og:type',
					content: 'website'
				},
				{
					property: 'og:image',
					content: 'https://www.adoryvo.com/images/site-preview.png'
				}
			],
			link: [
				{ rel: 'canonical', href: 'https://www.adoryvo.com/' }
			]
		})

		const pages = reactive([
					'about',
					'projects',
					'contact'
				]);
	
		return { pages }
	},
}
</script>

<template>
	<main class="h-screen grid">
		<section class="card mx-auto place-self-center text-center font-medium">
			<figure>
				<img class="border-4 border-dark rounded-full shadow-2xl mx-auto hover:scale-95 transition-transform duration-500"
					width="152" height="152" src="/images/me.png" format="webp" quality="100" alt="Photo of Adory" />
				<figcaption class="mt-3">
					<div class="font-semibold serif text-lg text-blue-300">
						Adory Vo
					</div>
					<div class="text-white">
						Aspiring Software Developer and Educator
					</div>
				</figcaption>
			</figure>

			<div class="text-emerald-400 mt-2">
				<i class="fas fa-graduation-cap"></i>
				Torrey Pines High School '19
			</div>
			<div class="text-blue-400">
				<i class="fas fa-university"></i>
				UC San Diego '23
			</div>

			<hr class="my-3 border-dark">
			<div class="flex justify-evenly text-blue-200">
				<div v-for="page of pages">
					<NavLink :to="page" currentPage="/index" :key="page">{{ page }}</NavLink>
				</div>
			</div>
		</section>
	</main>
</template>