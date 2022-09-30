<template>
	<main>
		<BodyTitle class="mb-1">anagram finder</BodyTitle>
		<b class="text-green-400">Completed: September 2022</b>
		<p class="my-4">
			A tool to find all anagrams & sub-anagrams from a specified letter pool!
			<br>
			To filter anagrams by a specific letter sequence, you may specify a template. Underscores will match any letter.
			<br>
			<i title="Developed with Michael Huo">- Inspired by Wordscapes</i>
		</p>

		<form id="formA">
			<label class="block mb-3">
				<input type="checkbox" id="matchLength" checked class="rounded mr-1">
				Match Length
			</label>

			<label class="block mb-3">
				Letter Pool
				<input type="text" id="letters" placeholder="ex: steak" class="input-primary">
			</label>

			<label class="block mb-3">
				Template
				<input type="text" id="template" placeholder="ex: s_a_e" class="input-primary">
			</label>

			<BodyHeading class="mt-5">Possible Anagrams</BodyHeading>
			<ul id="anagrams" class="list-disc list-inside">
				<li>🤔</li>
			</ul>
		</form>

		<Script src="/scripts/anagram-finder.js"></Script>
	</main>
</template>