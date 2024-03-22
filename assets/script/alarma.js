const addBtn = document.querySelector(".add-btn"),
	titleTag = document.getElementById("alarmTitle"),
	newAlarmBox = document.querySelector(".wrapper"),
	closeBox = document.querySelectorAll(".close"),
	selectHours = document.getElementById("hours"),
	selectMinutes = document.getElementById("minutes"),
	selectSong = document.getElementById("songs"),
	dateTag = document.querySelectorAll(".date-check"),
	btnIncrementoDecremento = document.querySelectorAll(".btn-angle"),
	confirmBox = document.querySelector(".box-confirm"),
	timeRef = document.querySelector(".timer-display"),
	dateRef = document.querySelector(".date"),
	addAlarm = document.getElementById("addAlarm"),
	hourTag = document.getElementById("hours"),
	minuteTag = document.getElementById("minutes"),
	songTag = document.getElementById("songs"),
	checkBox = document.querySelectorAll(".check"),
	alertBox = document.querySelector(".alert-clock");

const alarms = JSON.parse(localStorage.getItem("alarms") || "[]");

let isUpdate = false,
	updateId,
	play,
	clock,
	clockInterval;
let dateCheck = Array(7).fill(true);

const sounds = {
	gallo: "assets/song/alarma-gallo.mp3",
	clock: "assets/song/alarm-clock.mp3",
	ringtone: "assets/song/alarma-ringtones.mp3",
};

// Boton auto incremento o decremento ventana config nueva alarma
btnIncrementoDecremento.forEach((e) => {
	e.addEventListener("click", () => {
		if (e.classList.contains("hour")) {
			if (e.classList.contains("minus")) {
				if (selectHours.value == "0") selectHours.value = 23;
				else
					selectHours.value = (
						parseInt(selectHours.value, 10) - 1
					).toString();
			} else {
				if (selectHours.value == "23") selectHours.value = "0";
				else
					selectHours.value = (
						parseInt(selectHours.value, 10) + 1
					).toString();
			}
		} else {
			if (e.classList.contains("minus")) {
				if (selectMinutes.value == "0") selectMinutes.value = 59;
				else
					selectMinutes.value = (
						parseInt(selectMinutes.value, 10) - 1
					).toString();
			} else {
				if (selectMinutes.value == "59") selectMinutes.value = "0";
				else
					selectMinutes.value = (
						parseInt(selectMinutes.value, 10) + 1
					).toString();
			}
		}
	});
});

// Configuro la nueva alarma
addAlarm.addEventListener("click", (e) => {
	e.preventDefault();
	let alarmInfo;

	dateTag.forEach((date, index) => {
		if (date.checked) dateCheck[index] = true;
		else dateCheck[index] = false;
	});

	// console.log(dateCheck);

	if (!isUpdate) {
		alarmInfo = {
			title: titleTag.value,
			hour: hourTag.value,
			minute: minuteTag.value,
			song: songTag.value,
			day: dateCheck,
			state: true,
			play: false,
		};
		alarms.push(alarmInfo);
	} else {
		isUpdate = false;
		alarms[updateId].title = titleTag.value;
		alarms[updateId].hour = hourTag.value;
		alarms[updateId].minute = minuteTag.value;
		alarms[updateId].song = songTag.value;
		alarms[updateId].day = dateCheck;
	}

	localStorage.setItem("alarms", JSON.stringify(alarms));
	closeBox[0].click();
	showAlarms();
});

//Mostrar todas las alarmas agregadas
function showAlarms() {
	document.querySelectorAll(".alarm").forEach((alarm) => alarm.remove());

	alarms.forEach((alarm, index) => {
		let divAlarm = document.createElement("div");
		let state;

		divAlarm.setAttribute("class", "alarm");
		divAlarm.setAttribute("id", index);

		if (alarm.state == true) state = "checked";
		else state = "";

		divAlarm.innerHTML = `
                    <p>${alarm.title}</p>
                    <div class="time" data-value="${appendZero(
						alarm.hour
					)}:${appendZero(alarm.minute)}">${appendZero(
			alarm.hour
		)}:${appendZero(alarm.minute)}</div>
                    <div><input class="check" type="checkbox" ${state} onclick="activated(this)"></div>
                    <div class="settings ">
                        <i class="fas fa-ellipsis" onclick="showMenu(this)"></i>
                        <ul class="menu">
                            <li onclick="updateAlarm(${index})"><i class="fas fa-pen"></i>Editar</li>
                            <li onclick="deleteAlarm(${index})"><i class="fas fa-trash"></i>Eliminar</li>
                        </ul>
                    </div>
        `;
		document
			.querySelector(".alarm-active")
			.insertBefore(
				divAlarm,
				document.querySelector(".alarm-active").children[0]
			);
	});
}
showAlarms();
// Eliminar alarmas
let alarmId; // creo esta variable porque me acumula los clicks el evento si  lo paso como parametro
function deleteAlarm(id) {
	alarmId = id;
	confirmBox.classList.add("show");
	document.getElementById("accept-delete").addEventListener("click", del);
}
function del() {
	// console.log(alarmId);
	alarms.splice(alarmId, 1);
	localStorage.setItem("alarms", JSON.stringify(alarms));
	showAlarms();
	confirmBox.classList.remove("show");
}

// Edito la alarma, sea titulo , horario o sonido
function updateAlarm(alarmId) {
	updateId = alarmId;
	isUpdate = true;
    document.querySelector('.head h3').innerHTML = 'Editar Alarma';
    document.getElementById('addAlarm').innerHTML = 'Editar';
	titleTag.value = alarms[alarmId].title;
	hourTag.value = alarms[alarmId].hour;
	minuteTag.value = alarms[alarmId].minute;
	songTag.value = alarms[alarmId].song;
	dateCheck = alarms[alarmId].day;
	addBtn.click();
}

// Abre la ventana para crear una nueva alarma
addBtn.addEventListener("click", () => {
	titleTag.focus();
	dateTag.forEach((e, id) => {
		e.checked = dateCheck[id];
	});
	newAlarmBox.classList.add("show");
});
//Cierro la ventana para crear una nueva alarma ( con btn "cruz" o con btn cancel)
closeBox.forEach((e) => {
	e.addEventListener("click", () => {
		newAlarmBox.classList.remove("show");
		confirmBox.classList.remove("show");
		alertBox.classList.remove("show");
		isUpdate = false;
		titleTag.value = "";
		hourTag.value = "0";
		minuteTag.value = "0";
		dateCheck = Array(7).fill(true);
        document.querySelector(".head h3").innerHTML = "Nueva Alarma";
        document.getElementById("addAlarm").innerHTML = "Agregar";

		// songTag.value = '0';
		if (clock) {
			clock.pause();
			clock = null;
			clearTimeout(clockInterval);
			document.title = "Alarma";
		}
	});
});

// Muestra el menu de opciones de las alarmas creadas
function showMenu(e) {
	e.parentElement.classList.add("show");
	document.addEventListener("click", (elem) => {
		if (elem.target.tagName != "I" || elem.target != e)
			e.parentElement.classList.remove("show");
	});
}
//agrego ceros a la izq hasta llegar longitud 2
function appendZero(value) {
	return value.toString().padStart(2, "0");
}
// boton probar sonido
function playSong() {
	if (play) {
		alarmSound.pause();
		play = false;
		document.querySelector(".input-song .fas").classList.add("fa-play");
		document.querySelector(".input-song .fas").classList.remove("fa-stop");
	} else {
		document.querySelector(".input-song .fas").classList.remove("fa-play");
		document.querySelector(".input-song .fas").classList.add("fa-stop");
		alarmSound = new Audio(selectSong.value);
		alarmSound.play();
		play = true;
	}
}

function activated(e) {
	id = e.parentElement.parentElement.getAttribute("id");
	if (e.checked) {
		alarms[id].state = true;
	} else {
		alarms[id].state = false;
	}
	alarms[id].play = false;
	localStorage.setItem("alarms", JSON.stringify(alarms));
}

// console.log(document.title);

function displayTimer() {
	let date = new Date();
	let titulo = document.title;
	let [hour, minute, second] = [
		appendZero(date.getHours()),
		appendZero(date.getMinutes()),
		appendZero(date.getSeconds()),
	];
	
	timeRef.innerHTML = `${hour}:${minute}:${second}`;
	
	if (hour == 0 && minute == 0 && second == 0){
		dateRef.innerHTML = `${semana[date.getDay()]}, ${date.getDate()} de ${meses[date.getMonth()]} de ${date.getFullYear()}`;
	}

	document.querySelectorAll(".alarm").forEach((e) => {
		let time = e.querySelector(".time"),
			id = e.getAttribute("id");

		if (
			alarms[id].state &&
			alarms[id].day[date.getDay()] &&
			time.dataset.value == `${appendZero(hour)}:${appendZero(minute)}` &&
			!alarms[id].play
		) {
			clock = new Audio(alarms[id].song);
			clock.play();
			alarms[id].play = true;
			clock.loop = true;
			alertBox.classList.add("show");
			setTimeout(() => {
				alarms[id].play = false;
			}, 60000);
		}
	});
	if (alertBox.classList.contains("show"))
		clockInterval = setTimeout(() => {
			if (document.title == titulo)
				document.title = "***¡Alerta Alarma!***";
			else document.title = titulo;
		}, 1000);
}

window.onload = () => {
	setInterval(displayTimer, 1000);
};

// console.log(dateRef);
(function () {
	let today = new Date();
	dateRef.innerHTML = `${semana[today.getDay()]}, ${today.getDate()} de ${meses[today.getMonth()]} de ${today.getFullYear()}`;
	for (let i = 0; i < 24; i++) {
		let tag = `<option value="${i}">${appendZero(i)}</option>`;
		selectHours.insertAdjacentHTML("beforeend", tag);
	}
	for (let i = 0; i < 60; i++) {
		let tag = `<option value="${i}">${appendZero(i)}</option>`;
		selectMinutes.insertAdjacentHTML("beforeend", tag);
	}

	Object.entries(sounds).forEach(([key, value]) => {
		let tag = `<option value="${value}">${key}</option>`;
		selectSong.insertAdjacentHTML("beforeend", tag);
	});
})();
