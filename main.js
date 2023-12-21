const apiKey = '601db7afc58a47c7bd4145108232112'

const header = document.querySelector('.header')
const form = document.querySelector('#form')
const input = document.querySelector('#cityInput')


// listening to the form submission
form.onsubmit = function (e) {
	// Canceling the submission of the form
	e.preventDefault()

	// Take the value from the input, trim the spaces
	let city = input.value.trim();
	// Making a request to the server
	const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

	fetch(url).then((response) => {
		return response.json()
	}).then((data) => {
		// Check if there is an error 
		if (data.error) {
			// Delete the card on the page
			const prevCard = document.querySelector('.card')
			if(prevCard) prevCard.remove()

			const html = `<div class="card">${data.error.message}</div>`
			// Display the card on the page
			header.insertAdjacentHTML('afterend', html)
		} else {
	
			// Layout for the card
			const html = `<div class="card">
												<div class="card-city">
													<h2>${data.location.name}</h2>
													<img src="./img/location.svg" alt="">
												</div>
												<div class="card-weather">
													<div class="card-temp">${data.current.temp_c} °C</div>
														<img src="./img/Weather-image.png" alt="Weather">
												</div>
												<div class="card-desc">${data.current.condition.text}</div>
											</div>`
			const prevCard = document.querySelector('.card')
			if(prevCard) prevCard.remove()
			// Display the card on the page
			header.insertAdjacentHTML('afterend', html)
		}

	})
}