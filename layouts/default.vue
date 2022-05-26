<script>
function getTitle(path) {
	const sliced = path.split('-');
	const capitalized = sliced.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
	return capitalized.join(' ');
}

export default {
	computed: {
		currentPage() {
			return this.$route.path;
		},
		currentTitle() {
			const fullPath = this.$route.path;
			const pagePath = fullPath.slice(fullPath.lastIndexOf('/') + 1)

			return getTitle(pagePath)
		}
	},
}
</script>

<template>
	<div class="min-h-screen grid auto-rows-min content-between">
		<Head>
			<Title>{{ currentTitle }}</Title>
		</Head>

		<Navbar :current-page="currentPage" />
		<div class="sm:container sm:w-2/3 sm:my-32 m-5 sm:mx-auto">
			<BodyCard>
				<slot />
			</BodyCard>
		</div>
		<Footer />
	</div>
</template>