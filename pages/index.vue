<script>
export default {
	setup() {
		definePageMeta({
			layout: false
		});

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
				<img class="border-4 border-dark rounded-full shadow-2xl w-36 h-36 mx-auto hover:scale-95 transition-transform duration-500" width="144" height="144"
					src="images/me-1400x1400.jpg" srcset="images/me-144x144.jpg 144w, images/me.jpg 1400w" sizes="7vw"
					alt="Photo of Adory">
				<figcaption class="mt-3">
					<div class="font-semibold serif text-lg text-blue-300">
						Adory Vo
					</div>
					<div class="text-white">
						Aspiring Software Developer and Educator
					</div>
				</figcaption>
			</figure>

			<div class="text-red-600 mt-2">
				<i class="fas fa-graduation-cap"></i>
				Torrey Pines High School '19
			</div>
			<div class="text-blue">
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