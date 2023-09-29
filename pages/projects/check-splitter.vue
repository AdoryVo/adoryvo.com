<script setup>
const vFormA = {
	beforeMount: (form) => {
		const inputs = Array.from(form.getElementsByTagName('input'));

		inputs.forEach(input => {
			input.value = '';
		});

		form.elements['useDefaultTaxRate'].addEventListener('change', function() {
			const checkSubtotalDiv = form.elements['checkSubtotal'].parentNode;
			const taxDiv = form.elements['tax'].parentNode;
			
			if (this.checked) {
				checkSubtotalDiv.classList.replace('block', 'hidden');
				taxDiv.classList.replace('block', 'hidden');
			} else {
				checkSubtotalDiv.classList.replace('hidden', 'block');
				taxDiv.classList.replace('hidden', 'block');
			}
		});
	}
}

useHead({
		script: [
			{ src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjs/10.6.0/math.min.js' },
			{ src: '/scripts/check-splitter.js' }
		]
	})
</script>

<template>
	<main>
		<BodyTitle>check splitter</BodyTitle>
		<p class="mb-4">
			A tool to figure out how much an individual pays (including tax!) when splitting a check!
			<br>
			To verify that your check uses a 7.75% tax rate, plug in your check subtotal below and see if the result matches the check total.
		</p>

		<form v-form-a id="formA" oninput="calcIndShare()">
			<label class="block my-3">
				<input type="checkbox" name="useDefaultTaxRate" class="rounded mr-1" checked>
				Use San Diego Sales Tax Rate of 7.75% 
			</label>

			<label class="block mb-3">
				Individual Subtotal ($) - accepts math expressions
				<input type="text" name="indSubtotal" placeholder="ex: 1.00 + 1.50*3" class="input-primary">
				<span id="exprErrorMsg" class="text-red-500 mt-1"></span>
			</label>

			<label class="hidden my-3">
				Check Subtotal ($)
				<input type="number" name="checkSubtotal" placeholder="0.00" step=".01" min="0" class="input-primary">
			</label>

			<label class="hidden my-3">
				Check Tax ($)
				<input type="number" name="tax" placeholder="0.00" step=".01" min="0" class="input-primary">
			</label>

			<BodyHeading class="mt-5">Result</BodyHeading>
			Individual's Total Share: $<span id="totalShare">0.00</span>
		</form>

		<hr class="my-4">

		<!-- Upcoming features -->
		<h2 class="text-xl font-semibold text-emerald-300">Upcoming features</h2>
		<ul class="list-disc list-inside">
			<li>Text entry for tip percent to calculate tip split</li>
			<li>Functionality to store your results to keep track of all of a check's splits</li>
			<li>A tool to calculate splitting a check evenly</li>
		</ul>
	</main>
</template>