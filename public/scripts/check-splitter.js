function parseInput(input) {
	if (!math.hasNumericValue(input)) {
		return false;
	}

	return math.round(math.number(input), 2);
}

function calcIndShare() {
	const form = document.getElementById('formA');
	let subtotal = parseInput(form.elements['checkSubtotal'].value) || 1;
	let tax = parseInput(form.elements['tax'].value) || 0;

	// Calculate individual subtotal
	const exprErrorMessage = document.getElementById('exprErrorMsg');
	let indSubtotalExpr, indSubtotal;
	try {
		indSubtotalExpr = form.elements['indSubtotal'].value;
		indSubtotal = math.evaluate(indSubtotalExpr) || 0;
		exprErrorMessage.innerHTML = '';
	} catch (error) {
		exprErrorMessage.innerHTML = '❗ Invalid arithmetic expression!';
		return;
	}

	// Calculate subshares
	const taxShare = (indSubtotal / subtotal) * tax;
	const totalShare = taxShare + indSubtotal;

	// Update individual share
	document.getElementById('totalShare').innerHTML = totalShare.toFixed(2);
}
