Number.prototype.between = function (a, b) {
	const min = Math.min(a, b),
		max = Math.max(a, b);

	return this >= min && this <= max;
};

function randomItem(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function parseTime(timeString) {
	return luxon.DateTime.fromFormat(timeString, 'T').toLocaleString(luxon.DateTime.TIME_SIMPLE);
}

function checkIfOpenNow(daysHours, options = { specificTime: ':', excludeClosingSoon: false }) {
	if (!options.specificTime) options.specificTime = ':';
	const specificTimeArr = options.specificTime.split(':').map((num) => parseInt(num));
	const today = new Date();
	let hours = specificTimeArr[0] || today.getHours();
	// Exclude restaurants closing soon from "open" restaurants
	if (options.excludeClosingSoon) {
		hours = (hours + 1) % 24;
	}
	const minutes = specificTimeArr[1] || today.getMinutes();

	const openingArr = daysHours.opening.split(':').map((num) => parseInt(num));
	const opening = { hours: openingArr[0], minutes: openingArr[1] };

	const closingArr = daysHours.closing.split(':').map((num) => parseInt(num));
	const closing = { hours: closingArr[0], minutes: closingArr[1] };

	// Open 24/7
	if (daysHours.opening === daysHours.closing) {
		return true;
	}

	if (hours === opening.hours) {
		// Not open yet!
		return false;
	}
	if (hours === closing.hours) {
		return minutes.between(0, closing.minutes);
	}

	// CASE I: Opening < Closing
	// (ex: 8:30 < Curr < 22:30); True - [8:00, 21:30]; False - [0:00, 7:59] U [21:31, 23:59]
	if (opening.hours < closing.hours || (opening.hours === closing.hours && opening.minutes < closing.minutes)) {
		return hours.between(opening.hours, closing.hours);
	}

	// CASE II: Closing < Opening
	// (ex: 1:30 < Curr < 10:30); True - [10:00, 23:59] U [0:00, 0:30]; False - [0:31, 9:59]
	if (closing.hours < opening.hours || (opening.hours === closing.hours && closing.minutes < opening.minutes)) {
		return !hours.between(opening.hours, closing.hours);
	}
}

function isClosingSoon(daysHours) {
	return checkIfOpenNow(daysHours) && !checkIfOpenNow(daysHours, { excludeClosingSoon: true });
}

$('details').on('toggle', () => {
	$(window).trigger('resize');
});

fetch('/data/restaurants.json')
	.then((response) => response.json())
	.then((restaurants) => {
		// console.log({'restaurants.json': restaurants});
		const DAY_DICT = {
			0: 'Sun',
			1: 'Mon',
			2: 'Tues',
			3: 'Wed',
			4: 'Thurs',
			5: 'Fri',
			6: 'Sat',
		};

		const restaurantPoolList = $('#restaurantPool');
		const openRestaurantsList = $('#openRestaurants');
		let openRestaurants = [];

		restaurantPoolList.empty();
		openRestaurantsList.empty();

		for (const restaurantName in restaurants) {
			restaurantPoolList.append($(`<li>${restaurantName}</li>`));

			const restaurant = restaurants[restaurantName];
			const today = DAY_DICT[new Date().getDay()];

			for (const days in restaurant) {
				const daysHours = restaurant[days];

				if (days.split(',').includes(today) && checkIfOpenNow(daysHours)) {
					openRestaurants.push(restaurantName);
					const restaurantNameStyled = `<b>${restaurantName}</b> &emsp;`;

					if (daysHours.opening === daysHours.closing) {
						openRestaurantsList.append($(`<li>${restaurantNameStyled} (Open 24 hours)</li>`));
					} else {
						const closingWarning = isClosingSoon(daysHours)
							? '&emsp; <i class="text-red-200">❗ Closing Soon ❗</i>'
							: '';
						openRestaurantsList.append(
							$(
								`<li>${restaurantNameStyled} 
								(${parseTime(daysHours.opening)} - ${parseTime(daysHours.closing)}) ${closingWarning} 
								</li>`
							)
						);
					}
				}
			}
		}

		$(window).trigger('resize');

		const rollBtn = $('#rollBtn');
		const result = $('#result');
		rollBtn.on('click', function () {
			const previousChoice = result.text();
			const ROLL_ITERATIONS = 10;
			const TIME_BETWEEN_ROLLS = 50;

			// Flash a bunch of options
			for (let iteration = 0; iteration < ROLL_ITERATIONS; iteration++) {
				setTimeout(() => result.text(randomItem(openRestaurants)), iteration * TIME_BETWEEN_ROLLS);
			}

			// Ensure a different choice than before is generated
			setTimeout(() => {
				while (previousChoice === result.text()) {
					result.text(randomItem(openRestaurants));
				}
			}, ROLL_ITERATIONS * TIME_BETWEEN_ROLLS + 100);
		});
	});
