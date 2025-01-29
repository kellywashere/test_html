
function addInfoLine(line) {
	const pEl = document.createElement("p");
	const txtNode = document.createTextNode(line);
	pEl.appendChild(txtNode);
	document.getElementById("div-info").appendChild(pEl);
}


const ww = window.innerWidth;
const wh = window.innerHeight;
const dpr = window.devicePixelRatio || 1;

addInfoLine("Window: " + ww + " x " + wh);
addInfoLine("Device Pixel Ratio: " + dpr);
