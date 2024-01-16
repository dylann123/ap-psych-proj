let mlk = document.createElement("img")
mlk = document.getElementById("mlk")
let brain = document.createElement("img")
brain = document.getElementById("brain")

let started = false
let focused = false

document.getElementById("mlk").style.opacity = "0.5";

async function start() {
	if (started) return;

	mlk.style.top = "-30px";
	mlk.style.left = "-130px";
	mlk.style.position = "absolute";
	mlk.style.width = "110%";
	mlk.style.transition = "1s";

	started = true;
	for (let title of document.getElementsByClassName("title"))
		title.style.opacity = "0";
	mlk.style.opacity = "1";
	mlk.style.transitionTimingFunction = "ease-in-out";
	await wait(0.5);
	mlk.style.width = "150%";

	let maintitle = document.getElementsByClassName("title")[0]
	maintitle.innerHTML = "Martin Luther King Jr.";
	maintitle.style.fontSize = "3em";
	await wait(0.5);
	maintitle.style.opacity = "1";
	maintitle.style.transitionTimingFunction = "ease-in-out";

	let subtitle = document.getElementsByClassName("title")[1]
	subtitle.innerHTML = "<br><br>Click any brain part to learn more";
	subtitle.style.fontSize = "1.5em";
	await wait(0.5);
	mlk.style.opacity = "0"
	document.getElementById("brain").style.opacity = "1";
	subtitle.style.opacity = "1";
	subtitle.style.transitionTimingFunction = "ease-in-out";
	setTimeout(async () => {
		for (let button = 0; button < document.getElementsByClassName("brain-button").length; button++) {
			document.getElementsByClassName("brain-button")[button].style.display = "inline-block";
			await wait(0.1);
			document.getElementsByClassName("brain-button")[button].style.opacity = "1";
		}
		for (let button = 0; button < document.getElementsByClassName("brain-button").length; button++) {
			document.getElementsByClassName("brain-button")[button].style.transition = "0s";
		}
	}, 1);
	setTimeout(async () => {
		for (let part of document.getElementsByClassName("brainpart")) {
			await wait(0.1);
			part.style.opacity = "1";
		}

	}, 1);
	document.getElementById("descriptor").style.opacity = "1";
}

async function wait(seconds) {
	return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

document.addEventListener("mousedown", start);

document.addEventListener("mousemove", (event) => {
	if (!started) {
		// generate mouse parallax effect on mlk

		mlk.style.transition = "0s";

		// get mouse position	
		let x = event.clientX;
		let y = event.clientY;

		// get window size
		let width = window.innerWidth;
		let height = window.innerHeight;

		// calculate mlk position
		let mlkX = 0.5 - x / width;
		let mlkY = 0.5 - y / height;

		// apply mlk position
		mlk.style.transform = `translate(${mlkX * 30}px, ${mlkY * 30}px)`
	}
})

for (let button of document.getElementsByClassName("brain-button")) {
	button.addEventListener("mouseover", () => {
		if (focused) return;
		document.getElementById("descriptor").innerHTML = button.innerText + "<br>" + button.getAttribute("data-desc");
		let part = document.getElementById(button.getAttribute("data-brain-part"));
		part.src = `./src/on/${button.getAttribute("data-brain-part").toLowerCase()}-on.png`
		for (let p of document.getElementsByClassName("brainpart")) {
			p.style.opacity = "0.2";
			p.style.transition = "0s";
		}
		part.style.opacity = "1";
		part.style.zIndex = "10";
	})
	button.addEventListener("mouseleave", () => {
		if (focused) return;
		let part = document.getElementById(button.getAttribute("data-brain-part"));
		part.src = `./src/off/${button.getAttribute("data-brain-part").toLowerCase()}-off.png`
		for (let part of document.getElementsByClassName("brainpart")) {
			part.style.opacity = "1";
		}
		document.getElementById("descriptor").innerHTML = "Hover over a brain part to learn more";
		part.style.zIndex = "1";
	})
	button.addEventListener("click", () => {
		let part = document.getElementById(button.getAttribute("data-brain-part"));
		if (!focused) {
			for (let btns of document.getElementsByClassName("brain-button")) {
				btns.disabled = "true";
			}
			button.disabled = null;
			button.style.backgroundColor = "white";
			part.src = `./src/detailed/${button.getAttribute("data-brain-part").toLowerCase()}-on.png`
			part.style.zIndex = "99999";
			brain.style.opacity = "0.1";
			focused = true;
		} else {
			for (let btns of document.getElementsByClassName("brain-button")) {
				btns.disabled = null;
			}
			button.style.backgroundColor = null;
			part.src = `./src/on/${button.getAttribute("data-brain-part").toLowerCase()}-on.png`
			part.style.zIndex = "10";
			brain.style.opacity = "1";
			focused = false;
		}
	})
}

// reset page if no mouse movement for 30 seconds
let a = 0
setInterval(() => { if (++a > 30) window.location.reload() }, 1000);
document.addEventListener("mousemove", () => { a = 0 });