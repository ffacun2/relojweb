const subMenuBtn = document.querySelector(".fa-ellipsis"),
	confirmBox = document.querySelector(".box-confirm"),
	closeBox = document.querySelectorAll(".close"),
	addTime = document.querySelector(".addTime"),
	newTimeBox = document.querySelector(".wrapper"),
	titleTag = document.getElementById("relojTitle"),
	countryTag = document.getElementById("countries"),
	zoneTag = document.getElementById("time-zone"),
	addWatch = document.getElementById("addWatch"),
	timeGral = document.querySelector(".timer-conteiner .timer-display"),
	locationGral = document.querySelector(".timer-conteiner .location"),
	dateGral = document.querySelector(".timer-conteiner .day-description");
;

const watches = JSON.parse(localStorage.getItem('watches') || "[]");

let isUpdate = false,
	updateId,
	watchId;



//Devuelve Horario de la zona horaria del parametro establecido
const getTZDate = (locale, timeZone) => {
	const date = new Date();
	// console.log(date.toLocaleTimeString(locale,{timeZone: timeZone}));
	// const nueva = date.toLocaleString
	return date.toLocaleTimeString(locale, { timeZone: timeZone });
};

//Devuleve Fecha de la zona horaria del parametro establecido
const getTZDay = (locale, timeZone) => {
	const date = new Date();

	return date.toLocaleDateString(locale, {timeZone: timeZone});
}

// console.log(getTZDay("GB", "Europe/London"));
// console.log(paises['AR']['timeZone']['America/Argentina/Tucuman']);

//Muestra el menu de opciones de cada reloj ( editar, eliminar )
function showMenu(e) {
	e.parentElement.classList.add("show");
	document.addEventListener("click", (elem) => {
		if (elem.target.tagName != "I" || elem.target != e)
			e.parentElement.classList.remove("show");
	});
}

// Btn icon para cerrar ventanas
//Reinicia valores de si se crea nuevo reloj o si se reinicia
closeBox.forEach( e => {
	e.addEventListener('click', () => {
		 confirmBox.classList.remove('show');
		 newTimeBox.classList.remove('show');
		 isUpdate = false;
		 titleTag.value = "";
		//  countryTag.value = ;
		//  zoneTag.value = ;
		document.querySelector('.head h3').innerHTML = 'Nuevo Reloj';
		addWatch.innerHTML = 'Agregar';
	})
})

//Btn agregar/modificar nuevo reloj( ventana wrapper )
addTime.addEventListener('click', () => {
	titleTag.focus();
	if(!isUpdate)
		titleTag.value = `${countryTag.options[countryTag.selectedIndex].text}, ${zoneTag.options[zoneTag.selectedIndex].text}`;
	newTimeBox.classList.add('show');
})

//Muestra/Carga todos los relojes almacenados en JSON, cada modoficacion los vuelve a cargar.
function showTime() {
	document.querySelectorAll(".location-time").forEach((location) => location.remove());

	watches.forEach((watch, index) => {
		let divWatch = document.createElement("div");


		divWatch.setAttribute("class", "location-time");
		divWatch.setAttribute("id", index);

		divWatch.innerHTML = `
                    <div class="encabezado">
                        <div class="title">${watch.title}</div>
                        <div class="settings">
                            
                            <i class="fas fa-ellipsis" onclick="showMenu(this)"></i>
                            <ul class="menu">
                                <li onclick="updateWatch(${index})"><i class="fas fa-pen"></i>Editar</li>
                                <li onclick="deleteWatch(${index})"><i class="fas fa-trash"></i>Eliminar</li>
                            </ul>
                        </div>
                    </div>
                    <div class="display">
						<div class="time">${getTZDate(watches[index].country,watches[index].zone)}</div>
						<div class="days">${getTZDay(watches[index].country, watches[index].zone)}</div>
					</div>
						`;
						//<i class="fas fa-thumbtack"></i>   *** Btn para fijar horario
						//<div class="difference">${getTZDay(watches[index].country, watches[index].zone)}</div>
                      						
		document.querySelector(".box-conteiner").insertBefore(divWatch,document.querySelector(".box-conteiner").children[0]);
	});
}

//Btn abrir ventana nuevo/editar reloj 
addWatch.addEventListener("click", (e) => {
	e.preventDefault();
	let watchInfo;
	
	if (!isUpdate) {
		watchInfo = {
			title: relojTitle.value,
			country: countryTag.value,
			zone: zoneTag.value
		};
		watches.push(watchInfo);
	} else {
		isUpdate = false;
		watches[watchId].title = relojTitle.value;
		watches[watchId].country = countryTag.value;
		watches[watchId].zone = zoneTag.value;
	}

	localStorage.setItem("watches", JSON.stringify(watches));
	closeBox[0].click();
	showTime();
});

//                                                                                 arreglar el horario fijo
document.querySelectorAll('.fa-thumbtack').forEach( elemento => {
	elemento.parentElement.parentElement.parentElement.classList.remove('selected');
	
	elemento.addEventListener('click', () => {
		let select = document.querySelector(".location-time.selected")
		
		if ( select != null ){
			select.classList.toggle('selected');
			console.log("click")
			
			
		}
		elemento.parentElement.parentElement.parentElement.classList.add('selected');
	})
});

//Elimina el reloj que se selecciona
function deleteWatch(id) {
	watchId = id;
	confirmBox.classList.add("show");
	document.getElementById("accept-delete").addEventListener("click", del);
}
//Elimina el reloj seleccionado desde JSON y vuelve a recargar todos los almacenados
function del() {
	watches.splice(watchId, 1);
	localStorage.setItem("watches", JSON.stringify(watches));
	showTime();
	confirmBox.classList.remove("show");
}
//Modifica el reloj seleccionado
function updateWatch(id) {
	watchId = id;
	isUpdate = true;
	document.querySelector(".head h3").innerHTML = "Editar Reloj";
	addWatch.innerHTML = "Editar";
	titleTag.value = watches[id].title;
	countryTag.value = watches[id].country;
	countryChange();
	zoneTag.value = watches[id].zone;
	addTime.click();
}

//Al cambiar el pais en la ventana de nuevo reloj(wrapper), recarga/actualiza sus provincias.
function countryChange (){
	// console.log(paises[countryTag.value]['timeZone'])
	document.querySelectorAll('.time-zone option').forEach( opc => opc.remove());
	
	Object.entries(paises[countryTag.value]["timeZone"]).forEach(([value,key]) => {
		// console.log(value,key)
		let tag = `<option value=${value}>${key}</option>`;
		zoneTag.insertAdjacentHTML("beforeend", tag);
	})
	titleTag.value = `${countryTag.options[countryTag.selectedIndex].text}, ${zoneTag.options[zoneTag.selectedIndex].text}`;
	// titleTag.value = `${countryTag.target}, ${paises[countryTag.value]["timeZone"][0]}`;
}
countryTag.addEventListener('change',countryChange);

zoneTag.addEventListener('change', () => {
	titleTag.value = `${countryTag.options[countryTag.selectedIndex].text}, ${zoneTag.options[zoneTag.selectedIndex].text}`;
	
})



// getTZDate('MX','America/Mazatlan');
// getTZDate('AR',"America/Argentina/Buenos_Aires")
// getTZDate('BR',"America/Manaus")

function localTime() {
	let fixed = new Date();
	locationGral.innerHTML = "Hora local"
	timeGral.innerHTML = `${fixed.getHours().toString().padStart(2,"0")}:${fixed.getMinutes().toString().padStart(2,"0")}:${fixed.getSeconds().toString().padStart(2,"0")}`
	// console.log(dateGral)
	dateGral.innerHTML = `${semana[fixed.getDay()]}, ${fixed.getDate()} de ${meses[fixed.getMonth()]} de ${fixed.getFullYear()}`
	
}


function runTime() {
	let select = false;
	document.querySelectorAll('.location-time').forEach( element => {
		// console.log(element.getAttribute('id'));
		// console.log(element.childNodes[3].childNodes[1].innerHTML);
		element.childNodes[3].childNodes[1].innerHTML = `${ getTZDate(watches[element.getAttribute('id')].country,watches[element.getAttribute('id')].zone) }`;
		// console.log(watches[element.getAttribute('id')].country,watches[element.getAttribute('id')].zone);
		// getTZDate(watches[element.getAttribute('id')].country.trim(),watches[element.getAttribute('id')].zone.trim())
		// console.log(getTZDate(paises[element.getAttribute('id')]))
		if (element.classList.contains('selected')){
			locationGral.innerHTML = `${watches[element.getAttribute('id')].title}`
			timeGral.innerHTML = `${ getTZDate(watches[element.getAttribute('id')].country,watches[element.getAttribute('id')].zone) }`;
			// dateGral.innerHTML = `${semana[fixed.getDay()]}, ${fixed.getDate()} de ${meses[fixed.getMonth()]} de ${fixed.getFullYear()}`
			select = true;
		} 
	})
	if (!select)
		localTime();
}


showTime();

//Genera las opciones de los elementos "options" de HTML con sus respectivos valores
(function() {
	Object.entries(paises).forEach(([value,key]) => {
		// console.log(value,key['name'])
		let tag = `<option value=${value}>${key['name']}</option>`;
		countryTag.insertAdjacentHTML("beforeend", tag);
	})
	Object.entries(paises['es-AR']["timeZone"]).forEach(([value,key]) => {
		// console.log(value,key)
		let tag = `<option value="${value}">${key}</option>`;
		zoneTag.insertAdjacentHTML("beforeend", tag);
	})
	titleTag.value = `${countryTag.options[countryTag.selectedIndex].text}, ${zoneTag.options[zoneTag.selectedIndex].text}`;
	// console.log(countryTag.options[countryTag.selectedIndex].text)
	
	localTime();
})();


//Recarga todos los relojes cada 1 ms
window.onload = () => {
	setInterval(runTime,1000);
}
// console.log("ARge",getTZDate("es-AR","America/Argentina/Cordoba"))
// console.log(getTZDate("AR","America/Argentina/Salta"))
// console.log(getTZDate("AR","America/Argentina/Jujuy"))
// console.log(getTZDate("AR","America/Argentina/Tucuman"))
// console.log(getTZDate("AR","America/Argentina/Catamarca"))
// console.log(getTZDate("AR","America/Argentina/La_Rioja"))
// console.log(getTZDate("AR","America/Argentina/San_Luis"))
// console.log(getTZDate("AR","America/Argentina/Rio_Gallegos"))
// console.log(getTZDate("AR","America/Argentina/Ushuaia"))

