<script>
export default {
	props: {
		currentPage: String,
		to: String
	}
}
</script>


<template>
	<NuxtLink :to="to" :class="{ 'text-white': currentPage.includes(to) }" class="hover:text-blue-100 mx-2">
		<slot />
	</NuxtLink>
</template>