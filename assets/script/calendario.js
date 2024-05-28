const selectMonth = document.getElementById("month"),
	selectYears = document.getElementById("years");
const date = new Date();

const months = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre",
];

const weeks = [
	"Domingo",
	"Lunes",
	"Martes",
	"Miercoles",
	"Jueves",
	"Viernes",
	"Sabado",
];

const renderCalendar = () => {
	date.setDate(1);
	date.setMonth(selectMonth.value);
	date.setFullYear(selectYears.value);
	// console.log(selectMonth.value);

	const monthDays = document.querySelector(".days");

	const lastDay = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).getDate();

	// console.log("ultimo dia", lastDay);

	const prevLastDay = new Date(
		date.getFullYear(),
		date.getMonth(),
		0
	).getDate();

	// console.log('prevultimo dia',prevLastDay);

	const firstDayIndex = date.getDay();
	const lastDayIndex = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).getDay();

	// console.log('index primer dia ',firstDayIndex);
	// console.log('index ultimo dia',lastDayIndex);
	// console.log('resto:',42-firstDayIndex-lastDay);
	const nextDay = 7 - lastDayIndex - 1;
	const relleno = 42 - firstDayIndex - lastDay;


	let days = "";
// console.log(prevLastDay-16);
	for (let x = firstDayIndex; x > 0; x--) {
		if((prevLastDay-x+1) == new Date().getDate() && date.getMonth() == new Date().getMonth()+1 && date.getFullYear() === new Date().getFullYear() )
			days += `<div class="prev-date today">${prevLastDay - x + 1}</div>`;
		else
			days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
	}

	for (let i = 1; i <= lastDay; i++) {
		if (
			i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()
		) {
			days += `<div class="today">${i}</div>`;
		} else {
			days += `<div>${i}</div>`;
		}
	}

	for (let j = 1; j <= relleno; j++) {
		if(j == new Date().getDate() && date.getMonth() == new Date().getMonth()-1 && date.getFullYear() === new Date().getFullYear() )
			days += `<div class="next-date today">${j}</div>`;		
		else
			days += `<div class="next-date">${j}</div>`;
	}
	monthDays.innerHTML = days;
};

document.querySelector(".prev").addEventListener("click", () => {
	date.setMonth(date.getMonth() - 1);
	selectMonth.value = date.getMonth();
	selectYears.value = date.getFullYear();
	renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
	date.setMonth(date.getMonth() + 1);
	selectMonth.value = date.getMonth();
	selectYears.value = date.getFullYear();
	renderCalendar();
});

selectMonth.addEventListener('change',() => {
	renderCalendar();
});

selectYears.addEventListener('change',() => {
	renderCalendar();
});



(function () {
	for (let i = 0; i < 12; i++) {
		let tag = `<option value="${i}">${months[i]}</option>`;
		selectMonth.insertAdjacentHTML("beforeend", tag);
	}
	selectMonth.value = date.getMonth();
	for (let i = 0; i < 200; i++) {
		let tag = `<option value="${date.getFullYear() + i - 100}">${
			date.getFullYear() + i - 100
		}</option>`;
		selectYears.insertAdjacentHTML("beforeend", tag);
	}
	selectYears.value = date.getFullYear();

})();

renderCalendar();