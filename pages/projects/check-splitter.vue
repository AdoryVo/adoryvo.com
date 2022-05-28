<script setup>
const vFormA = {
	beforeMount: (form) => {
		const inputs = Array.from(form.getElementsByTagName('input'));

		inputs.forEach(input => {
			input.value = '';
		});
	}
}
</script>

<template>
	<main>
		<BodyTitle>check splitter</BodyTitle>
		<p class="mb-4">A tool to figure out how much an individual pays (including tax!) when splitting a check!</p>

		<form v-form-a id="formA" oninput="calcIndShare()">
			<label class="block my-3">
				Individual Subtotal ($) - accepts math expressions
				<input type="text" name="indSubtotal" placeholder="ex: 1.00 + 1.50*3" class="input-primary">
				<span id="exprErrorMsg" class="text-red-500 mt-1"></span>
			</label>

			<label class="block my-3">
				Check Subtotal ($)
				<input type="number" name="checkSubtotal" placeholder="0.00" step=".01" min="0" class="input-primary">
			</label>

			<label class="block my-3">
				Check Tax ($)
				<input type="number" name="tax" placeholder="0.00" step=".01" min="0" class="input-primary">
			</label>

			<BodyHeading>Result</BodyHeading>
			Individual's Total Share: $<span id="totalShare">0.00</span>
		</form>

		<hr class="my-4">

		<!-- Upcoming features -->
		<h2 class="text-xl font-semibold text-emerald-300">Upcoming features</h2>
		<ul class="list-disc list-inside">
			<li>Functionality to store your results to keep track of all of a check's splits</li>
			<li>A tool to calculate splitting a check evenly</li>
		</ul>

		<Script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/10.6.0/math.min.js"></Script>
		<Script src="/scripts/check-splitter.js"></Script>
	</main>
</template>