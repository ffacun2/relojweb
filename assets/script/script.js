const dark_mode = document.querySelector(".sun-moon span"),
	menuBtn = document.querySelector(".btn-responsive span"),
	menuRef = document.querySelector(".nav")
;
// console.log(dark_mode,menuBtn,menuRef);

dark_mode.addEventListener('click', (e) => {
    if (localStorage.getItem("dark-mode") == "false") {
        e.target.innerHTML =  'light_mode';
        document.querySelector('html').classList.add('dark');
        localStorage.setItem("dark-mode",true);
    } else {
        e.target.innerHTML =  'dark_mode';
        document.querySelector('html').classList.remove('dark');
        localStorage.setItem("dark-mode",false);
    }

    console.log(localStorage.getItem("dark-mode"));
})

menuBtn.addEventListener('click', (e) => {
    // console.log('click');
    if ( e.target.innerHTML == 'menu'){
        menuRef.classList.add('show');
        e.target.innerHTML = 'close';
    } else {
        menuRef.classList.remove("show");
		e.target.innerHTML = "menu";
    }
})


document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("dark-mode") == "true") {
        document.querySelector("html").classList.add("dark");
        dark_mode.innerHTML = "light_mode";
    }
})