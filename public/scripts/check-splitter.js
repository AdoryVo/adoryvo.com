function parseInput(input) {
	if (!math.hasNumericValue(input)) {
		return false;
	}

	return math.round(math.number(input), 2);
}

function calcIndShare() {
	const DEFAULT_TAX_RATE = .0775;
	const DEFAULT_TAX_RATE_MULTIPLIER = DEFAULT_TAX_RATE + 1;

	const form = document.getElementById('formA');
	const useDefaultTaxRate = form.elements['useDefaultTaxRate'].checked;
	let subtotal = parseInput(form.elements['checkSubtotal'].value) || 1;
	let tax = parseInput(form.elements['tax'].value) || 0;

	// Calculate individual subtotal
	const exprErrorMessage = document.getElementById('exprErrorMsg');
	let indSubtotal;
	try {
		const indSubtotalExpr = form.elements['indSubtotal'].value;
		indSubtotal = math.evaluate(indSubtotalExpr) || 0;
		exprErrorMessage.innerHTML = '';
	} catch (error) {
		exprErrorMessage.innerHTML = '❗ Invalid arithmetic expression!';
		return;
	}

	// Calculate subshares
	const taxShare = (indSubtotal / subtotal) * tax;
	let totalShare = taxShare + indSubtotal;
	if (useDefaultTaxRate) {
		totalShare = indSubtotal * DEFAULT_TAX_RATE_MULTIPLIER;
	}

	// Update individual share
	document.getElementById('totalShare').innerHTML = totalShare.toFixed(2);
}