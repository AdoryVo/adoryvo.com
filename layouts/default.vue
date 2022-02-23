<script>
export default {
	computed: {
		currentPage() {
			return this.$route.name;
		}
	}
}
</script>

<template>
	<div class="min-h-screen">
		<Navbar :current-page="currentPage" />
		<main class="sm:container sm:w-2/3 sm:my-32 mx-auto">
			<BodyCard>
				<slot />
			</BodyCard>
		</main>
		<Footer />
	</div>
</template>