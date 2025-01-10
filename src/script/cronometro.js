let [miliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let [flagHour, flagMinute, flagSecond, flagMilisecond] = [0,0,0,0];
let control;
let flagTime = 0;
let contFlag = 0;
let totalElapsedTime = 0;
let lastFlagTime = 0;

let tableBody = document.querySelector(".table-body");

function start() {
	inicial = Date.now();
	control = setInterval(cronometro,10);
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


function flag(){
	let currentFlagTime = totalElapsedTime;
	let flagElapsedTime = currentFlagTime - lastFlagTime;
	lastFlagTime = currentFlagTime;

	let flagHours = Math.floor(flagElapsedTime / 3600000);
	let flagMinutes = Math.floor((flagElapsedTime % 3600000) / 60000);
	let flagSeconds = Math.floor((flagElapsedTime % 60000) / 1000);
	let flagMiliseconds = flagElapsedTime % 1000;

	let flagTimeString = (flagHours < 10 ? "0" + flagHours : flagHours) + ":" +
                         (flagMinutes < 10 ? "0" + flagMinutes : flagMinutes) + ":" +
                         (flagSeconds < 10 ? "0" + flagSeconds : flagSeconds) + "." +
                         (flagMiliseconds < 100 ? "0" + Math.floor(flagMiliseconds / 10) : Math.floor(flagMiliseconds / 10));

    let totalTimeString = (hours < 10 ? "0" + hours : hours) + ":" +
                          (minutes < 10 ? "0" + minutes : minutes) + ":" +
                          (seconds < 10 ? "0" + seconds : seconds) + "." +
                          (miliseconds < 100 ? "0" + Math.floor(miliseconds / 10) : Math.floor(miliseconds / 10));

	let row = document.createElement("tr");
	row.innerHTML = `<td>${++contFlag}</td><td>${flagTimeString}</td><td>${totalTimeString}</td>`;
	tableBody.appendChild(row);
	document.querySelector(".flag-conteiner").style.display = "block";
}


function cronometro() {
    let now = Date.now();
    let elapsedTime = now - inicial;
    totalElapsedTime += elapsedTime;
    inicial = now;

    miliseconds += elapsedTime;
    if (miliseconds >= 1000) {
        seconds++;
        miliseconds -= 1000;
    }
    if (seconds >= 60) {
        minutes++;
        seconds -= 60;
    }
    if (minutes >= 60) {
        hours++;
        minutes -= 60;
    }

    document.querySelector(".hh").innerHTML = (hours < 10 ? "0" + hours : hours) + ":";
    document.querySelector(".mm").innerHTML = (minutes < 10 ? "0" + minutes : minutes) + ":";
    document.querySelector(".ss").innerHTML = (seconds < 10 ? "0" + seconds : seconds);
    document.querySelector(".ms").innerHTML = "." + (miliseconds < 100 ? "0" + Math.floor(miliseconds / 10) : Math.floor(miliseconds / 10));
}