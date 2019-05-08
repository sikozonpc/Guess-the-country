(function() {
	const endpoint = "https://restcountries.eu/rest/v2/all";
	const answerField = document.querySelector(".answer-box");
	const flagAnswer = document.querySelector(".flag-answer");
	const checkBtn = document.querySelector(".check-btn");
	const countryNameTip = document.querySelector(".country-name-tip");
	const app = document.querySelector(".app");
	const answerType = document.querySelector(".answer-type");
	const scoreLabel = document.querySelector(".score");
	let score = 0;
	let countryName;
	const dataFromEndpoint = [];

	// Fetches the countries data from the endpoint
	function fetchDataFromEndpoint() {
		fetch(endpoint)
			.then((res) => res.json())
			.then((data) => {
				dataFromEndpoint.push(...data);
				playGame();
			})
			.catch((error) => alert(error));
	}

	// Index of the game, run it to start a new round
	function playGame() {
		scoreLabel.innerHTML = score + " points";

		const countryData = getRandomCountry(dataFromEndpoint);
		countryName = countryData.name.toLowerCase();
		displayFlag(countryData);
		displayPartialCountryName(countryName);
	}

	// Gets a random country from the api
	function getRandomCountry(dataFromEndpoint) {
		const randomNum = Math.floor(Math.random() * 250);
		return dataFromEndpoint[randomNum];
	}

	// Displays the flag to the DOM
	function displayFlag(countryData) {
		flagAnswer.innerHTML = `<img src="${countryData.flag}" class="flag" />`;
	}

	// Displays partialy the name of the country to the user
	function displayPartialCountryName(countryName) {
		const output = countryName.split("");
		const invalid = [" ", "-", "(", ")", "'", "ç", ","];
		// Show some letter only
		for (let l = 0; l < output.length; l++) {
			let rand = Math.floor(Math.random() * 10);
			if (rand >= 5 && !invalid.includes(output[l])) {
				output[l] = "_";
			}
		}

		countryNameTip.innerHTML = output.join("");
	}

	// Checks the validity of the answer and starts a new round
	function checkAnswer() {
		const answer = answerField.value;

		if (answer.toLowerCase() === countryName.toLowerCase()) {
			showCorrectMessage(countryName);
			playGame();
		} else {
			showFailedMessage(countryName);
			playGame();
		}
		clearInputField();
	}

	function showCorrectMessage(countryName) {
		answerType.innerHTML =
			'<p class="correct">Correct ! It was <span class="country">' +
			countryName +
			"</span> +1 point</p>";
		score++;
	}
	function showFailedMessage(countryName) {
		answerType.innerHTML =
			'<p class="failed">Failed, The correct answer was: <span class="country">' +
			countryName +
			"</span></p>";
	}
	function clearInputField() {
		answerField.value = "";
	}
	//
	//// MAIN
	//
	checkBtn.addEventListener("click", checkAnswer);
	answerField.addEventListener("keypress", (e) => {
		if (e.code === "Enter") checkAnswer();
	});
	fetchDataFromEndpoint();
})();
