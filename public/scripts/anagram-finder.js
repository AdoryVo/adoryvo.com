function countChars(letters) {
	const counts = {}
	for (const letter of letters) {
		if (!counts[letter])
			counts[letter] = 1;
		else
			counts[letter]++;
	}
	return counts;
}

function isAnagram(wordCounts, letterPoolCounts) {
	for (const letter in wordCounts) {
		if (!letterPoolCounts[letter] || wordCounts[letter] > letterPoolCounts[letter])
			return false;
	}
	return true;
}

function isLetter(char) {
	return 'abcdefghijklmnopqrstuvwxyz'.indexOf(char) !== -1;
}

fetch('/data/counted-corncob-word-list.json')
	.then((response) => response.json())
	.then((wordCountsList) => {
		const lettersInput = document.getElementById('letters');
		const templateInput = document.getElementById('template');
		const matchLengthCheckbox = document.getElementById('matchLength');

		function matchesTemplate(word, template) {
			if (matchLengthCheckbox.checked && lettersInput.value.length !== word.length) {
				return false;
			}

			if (template === '')
				// No template = no filtering required!
				return true;
			else if (word.length !== template.length)
				return false;
			
			// Compare the word with the template.
			for (const pos in word) {
				if (!isLetter(template[pos]))
					// Treat non-alphabetic characters as wildcards.
					continue;
				else if (template[pos] !== word[pos])
					return false;
			}

			return true;
		}

		function findAnagrams() {
			const letterPoolCounts = countChars(lettersInput.value);
			
			const anagrams = [];

			for (const word in wordCountsList) {
				if (isAnagram(wordCountsList[word], letterPoolCounts, templateInput.value)
				&& matchesTemplate(word, templateInput.value)) 
					anagrams.push(word);
			}

			/* Populate results! */
			const anagramsDiv = document.getElementById('anagrams');
			anagramsDiv.textContent = '';

			if (anagrams.length === 0) {
				anagramsDiv.innerHTML += '<li>🤔</li>';
			}
			
			for (const anagram in anagrams) {
				anagramsDiv.innerHTML += `<li>${anagrams[anagram]}</li>`;
			}
		}

		// Initialization
		const form = document.getElementById('formA');
		form.oninput = findAnagrams;
	});