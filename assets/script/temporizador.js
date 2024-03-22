const closeBox = document.querySelectorAll(".close"),
	newTempBox = document.querySelector(".wrapper"),
	alertBox = document.querySelector(".alert-clock"),
	editBtn = document.getElementById("edit-btn"),
	selectHours = document.getElementById("hours"),
	selectMinutes = document.getElementById("minutes"),
	selectSeconds = document.getElementById("seconds"),
	selectSongs = document.getElementById("songs"),
	btnIncrementoDecremento = document.querySelectorAll(".btn-angle"),
	startBtn = document.getElementById("startTemp");
    ;
    
const sounds = {
    gallo: "assets/song/alarma-gallo.mp3",
    clock: "assets/song/alarm-clock.mp3",
    ringtone: "assets/song/alarma-ringtones.mp3",
};
    
let [seconds, minutes, hours] = [0, 0, 0];
let control,  play, alarmSound;




startBtn.addEventListener('click', () => {
    seconds = selectSeconds.value;
    minutes = selectMinutes.value;
    hours = selectHours.value;
    document.querySelector(".hh").innerHTML = `${appendZero(hours)}:`;
    document.querySelector(".mm").innerHTML = `${appendZero(minutes)}:`;
    document.querySelector(".ss").innerHTML = `${appendZero(seconds)}`;
    
    if (selectSeconds.value != 0 || selectMinutes.value != 0 || selectHours.value != 0 ){
        // console.log(hours,minutes,seconds);
        document.getElementById("restart-btn").innerHTML = 'Iniciar';
        document.getElementById("restart-btn").disabled = false;
        document.getElementById("reset-btn").disabled = false;
    } else {
        document.getElementById("restart-btn").disabled = true;
    }
    closeBox[0].click();
})

function startTemp() {
    control = setInterval(temporizador,1000);
    document.getElementById('restart-btn').innerHTML = 'Reanudar';
    document.getElementById("restart-btn").disabled = true;
    document.getElementById("pause-btn").disabled = false;
}


function pause() {
	clearInterval(control);
	document.getElementById("pause-btn").disabled = true;
	document.getElementById("restart-btn").disabled = false;
	// document.getElementById("reset-btn").disabled = false;
}

function reset() {
    pause();
    if (selectSeconds.value != 0 || selectMinutes.value != 0 || selectHours.value != 0 ){
        startBtn.click();
    } else {
        document.getElementById("restart-btn").disabled = true;
    }
}


function temporizador() {

    document.querySelector(".hh").innerHTML = `${appendZero(hours)}:`;
	document.querySelector(".mm").innerHTML = `${appendZero(minutes)}:`;
	document.querySelector(".ss").innerHTML = `${appendZero(seconds)}`;

    
    if (seconds > 0 )
        seconds -= 1;
    else {
        seconds = 59;
        if ( minutes > 0)
            minutes -= 1;
        else{
            minutes = 59;
            if ( hours > 0)
                hours -= 1;
            else{
                clearInterval(control);
                alertBox.classList.add('show');
                document.getElementById("restart-btn").innerHTML = 'Iniciar';
                document.getElementById("pause-btn").disabled = true;
                alarmSound = new Audio(selectSongs.value);
                alarmSound.play();
                alarmSound.loop = true;
                play = true;
            }
        }
    
    }
}



function appendZero(value) {
	return value.toString().padStart(2, "0");
}

closeBox.forEach((element) => {
	element.addEventListener("click", () => {
		alertBox.classList.remove("show");
		newTempBox.classList.remove("show");

        if (alarmSound) {
			alarmSound.pause();
			alarmSound = null;
			play = false;
		}
	});
});

editBtn.addEventListener("click", (e) => {
    e.preventDefault();
	newTempBox.classList.add("show");
});


function playSong() {
	if (play) {
		alarmSound.pause();
		play = false;
		document.querySelector(".input-song .fas").classList.add("fa-play");
		document.querySelector(".input-song .fas").classList.remove("fa-stop");
	} else {
		document.querySelector(".input-song .fas").classList.remove("fa-play");
		document.querySelector(".input-song .fas").classList.add("fa-stop");
		alarmSound = new Audio(selectSongs.value);
		alarmSound.play();
		play = true;
	}
}

btnIncrementoDecremento.forEach((e) => {
	e.addEventListener("click", () => {
		if (e.classList.contains("hour")) {
			if (e.classList.contains("minus")) {
				if (selectHours.value == "0") selectHours.value = 23;
				else
					selectHours.value = (parseInt(selectHours.value, 10) - 1).toString();
			} else {
				if (selectHours.value == "23") selectHours.value = "0";
				else
					selectHours.value = (parseInt(selectHours.value, 10) + 1).toString();
			}
		} else {
            if (e.classList.contains('minute') ){
                if (e.classList.contains("minus")) {
				    if (selectMinutes.value == "0") 
                        selectMinutes.value = 59;
				    else
					    selectMinutes.value = (parseInt(selectMinutes.value, 10) - 1).toString();
			    } else {
				    if (selectMinutes.value == "59") 
                        selectMinutes.value = "0";
				    else
					    selectMinutes.value = (parseInt(selectMinutes.value, 10) + 1).toString();
			    }
            } else {
                if (e.classList.contains("minus")) {
				    if (selectSeconds.value == "0") 
                        selectSeconds.value = 59;
				    else
					    selectSeconds.value = (parseInt(selectSeconds.value, 10) - 1).toString();
			    } else {
				    if (selectSeconds.value == "59") 
                        selectSeconds.value = "0";
				    else
					    selectSeconds.value = (parseInt(selectSeconds.value, 10) + 1).toString();
			    }
            }
		}

	})
});

(function () {
	for (let i = 0; i < 24; i++) {
		let tag = `<option value="${i}">${appendZero(i)}</option>`;
		selectHours.insertAdjacentHTML("beforeend", tag);
	}
	for (let i = 0; i < 60; i++) {
		let tag = `<option value="${i}">${appendZero(i)}</option>`;
		selectMinutes.insertAdjacentHTML("beforeend", tag);
	}
	for (let i = 0; i < 60; i++) {
		let tag = `<option value="${i}">${appendZero(i)}</option>`;
		selectSeconds.insertAdjacentHTML("beforeend", tag);
	}

	Object.entries(sounds).forEach(([key, value]) => {
		let tag = `<option value="${value}">${key}</option>`;
		selectSongs.insertAdjacentHTML("beforeend", tag);
	});
})();
