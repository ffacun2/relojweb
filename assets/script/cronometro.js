let [miliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let control;
let flagTime = 0,
	ms = 0;
let contFlag = 0;

let tableBody = document.querySelector(".table-body");

function start() {
	control = setInterval(cronometro);
	document.getElementById("start-btn").disabled = true;
	document.getElementById("pause-btn").disabled = false;
	document.getElementById("restart-btn").disabled = true;
	document.getElementById("reset-btn").disabled = false;
	document.getElementById("flag-btn").disabled = false;
}

function pause() {
	clearInterval(control);
	document.getElementById("start-btn").disabled = true;
	document.getElementById("pause-btn").disabled = true;
	document.getElementById("restart-btn").disabled = false;
	document.getElementById("reset-btn").disabled = false;
	document.getElementById("flag-btn").disabled = true;
}

function reset() {
	clearInterval(control);
	[miliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
	document.querySelector(".hh").innerHTML = "00:";
	document.querySelector(".mm").innerHTML = "00:";
	document.querySelector(".ss").innerHTML = "00";
	document.querySelector(".ms").innerHTML = ".00";
	document.getElementById("start-btn").disabled = false;
	document.getElementById("pause-btn").disabled = true;
	document.getElementById("restart-btn").disabled = true;
	document.getElementById("reset-btn").disabled = true;
	document.getElementById("flag-btn").disabled = true;

	contFlag = 0;
	flagTime = 0;

	tableBody = document.querySelector(".table-body");
	while (tableBody.hasChildNodes()) {
		tableBody.removeChild(tableBody.firstChild);
	}
	document.querySelector(".flag-conteiner").style.display = "none";
}

function flag() {
	contFlag++;
	document.querySelector(".flag-conteiner").style.display = "block";
	inicial = new Date(flagTime);

	let [flagHour, flagMinute, flagSecond, flagMilisecond] = [
		Math.round((ms - flagTime) / (1000 * 60 * 60)),
		Math.round((ms - flagTime) / (1000 * 60)),
		Math.round((ms - flagTime) / 1000),
		ms - flagTime,
	];
	let msj = "Mensaje";
	let trFlag = document.createElement("tr");
	trFlag.innerHTML = `
					<th>${contFlag}</th>
                    <th>${flagHour.toString().padStart(2, "0")}:${flagMinute
		.toString()
		.padStart(2, "0")}:${flagSecond
		.toString()
		.padStart(2, "0")} . ${flagMilisecond.toString().padStart(2, "0")}</th>
                    <th>${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${seconds
		.toString()
		.padStart(2, "0")} . ${miliseconds.toString().padStart(2, "0")}</th>
                	`;
	tableBody.insertBefore(trFlag, tableBody.children[0]);

	flagTime = ms;
}

function cronometro() {
	miliseconds += 1;

	if (miliseconds > 99) {
		seconds++, (miliseconds = 0);
	}
	if (seconds > 59) {
		minutes++, (seconds = 0);
	}
	if (minutes > 59) {
		hours++, (minutes = 0);
	}
	if (hours > 59) {
		reset();
	}

	document.querySelector(".hh").innerHTML = `${hours
		.toString()
		.padStart(2, "0")}:`;
	document.querySelector(".mm").innerHTML = `${minutes
		.toString()
		.padStart(2, "0")}:`;
	document.querySelector(".ss").innerHTML = `${seconds
		.toString()
		.padStart(2, "0")}`;
	document.querySelector(".ms").innerHTML = `.${miliseconds
		.toString()
		.padStart(2, "0")}`;
}
