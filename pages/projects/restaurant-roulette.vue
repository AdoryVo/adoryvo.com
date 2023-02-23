<script setup>
	useHead({
		script: [
			{ src: '/scripts/restaurant-roulette.js' }
		]
	})
</script>

<template>
	<main>
		<BodyTitle>restaurant roulette</BodyTitle>
		<p class="mb-4">A tool to randomly select a restaurant around La Jolla!</p>

		<!-- Current restaurant pool -->
		<details class="mb-4">
			<summary class="italic">Current restaurant pool</summary>
			<ol id="restaurantPool" class="list-decimal list-inside">
			</ol>
		</details>

		<!-- Restaurants open now -->
		<BodyHeading>Restaurants open now</BodyHeading>
		<ul id="openRestaurants" class="list-disc list-inside text-sm sm:text-base mb-8">
		</ul>

		<!-- Roll button -->
		<h6 class="text-lg font-semibold mb-3">Choice: <span id="result" class="text-red-200">Take a roll!</span></h6>
		<button id="rollBtn" class="bg-blue-500 hover:bg-blue-700 transition-colors py-2 px-4 rounded">
			<i class="fas fa-dice-d20"></i>
			Roll!
		</button>

		<hr class="my-4">

		<!-- Upcoming features -->
		<h2 class="text-xl font-semibold text-emerald-300">Upcoming features</h2>
		<ul class="list-disc list-inside">
			<li>More restaurants!</li>
			<li>Selecting a custom list of certain restaurants from those available</li>
			<li>Filtering restaurants by category (ex: cheap, expensive, takeout, dine-in)</li>
			<li>Populating restaurants based on user location</li>
		</ul>
	</main>
</template>