<script>
export default {
	props: {
		title: String
	}
}
</script>

<template>
	<div class="bg-primary border-4 border-slate-900 rounded-xl text-blue-100 px-4 py-6 sm:p-8">
		<slot />
	</div>
</template>