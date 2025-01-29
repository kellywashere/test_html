// See also:
// https://dev.to/pahund/how-to-fix-blurry-text-on-html-canvases-on-mobile-phones-3iep
// https://stackoverflow.com/questions/2588181/canvas-is-stretched-when-using-css-but-normal-with-width-height-attributes
// https://medium.com/@doomgoober/understanding-html-canvas-scaling-and-sizing-c04925d9a830

let canvas1W;
let canvas1H;
let canvas2W;
let canvas2H;
let canvas3W;
let canvas3H;


function resize() {
	removeInfoLines();
	
	const ww = window.innerWidth;
	const wh = window.innerHeight;
	const dpr = window.devicePixelRatio || 1;

	addInfoLine("Window: " + ww + " x " + wh);
	addInfoLine("Device Pixel Ratio: " + dpr);

	const div1 = document.getElementById("div1");
	const div1w = div1.offsetWidth;
	const div1h = div1.offsetHeight;

	const div2 = document.getElementById("div2");
	const div2w = div2.offsetWidth;
	const div2h = div2.offsetHeight;

	const div3 = document.getElementById("div3");
	const div3w = div3.offsetWidth;
	const div3h = div3.offsetHeight;

	// make pixel width of canvas1 small (low res)
	canvas1W = div1w / 4;
	canvas1H = div1h / 4;

	// due to css width:100%, canvas is scaled to parent div size
	const canvas1 = document.getElementById("canvas1");
	canvas1.width  = canvas1W;
	canvas1.height = canvas1H;

	addInfoLine("canvas1: " + canvas1W + " x " + canvas1H);

	// canvas 2 has 1:1 scaling
	canvas2W = div2w;
	canvas2H = div2h;

	const canvas2 = document.getElementById("canvas2");
	canvas2.width  = canvas2W;
	canvas2.height = canvas2H;

	addInfoLine("canvas2: " + canvas2W + " x " + canvas2H);

	// canvas 3 scales pixels up by factor dpr
	canvas3W = div3w * dpr;
	canvas3H = div3h * dpr;

	const canvas3 = document.getElementById("canvas3");
	canvas3.width  = canvas3W;
	canvas3.height = canvas3H;

	addInfoLine("canvas3: " + canvas3W + " x " + canvas3H);

	const ctx1 = canvas1.getContext("2d");
	const ctx2 = canvas2.getContext("2d");
	const ctx3 = canvas3.getContext("2d");

	// Draw centered circles
	drawCircle(ctx1, canvas1W / 2, canvas1H / 2, canvas1H / 4, "red");
	drawCircle(ctx2, canvas2W / 2, canvas2H / 2, canvas2H / 4, "red");
	drawCircle(ctx3, canvas3W / 2, canvas3H / 2, canvas3H / 4, "red");

	// Text
	let fontsize1 = canvas1H / 8;
	ctx1.font = fontsize1.toString() + "px sans-serif";
	ctx1.fillStyle = "black";
	ctx1.fillText("Canvas 1", canvas1W * 0.02, canvas1H * 0.12);

	let fontsize2 = canvas2H / 8;
	ctx2.font = fontsize2.toString() + "px sans-serif";
	ctx2.fillStyle = "black";
	ctx2.fillText("Canvas 2", canvas2W * 0.02, canvas2H * 0.12);

	let fontsize3 = canvas3H / 8;
	ctx3.font = fontsize3.toString() + "px sans-serif";
	ctx3.fillStyle = "black";
	ctx3.fillText("Canvas 3", canvas2W * 0.02, canvas2H * 0.12);
}

window.onload = function () {
	resize();
	
	window.addEventListener("resize", resize);
}

function addInfoLine(line) {
	const pEl = document.createElement("p");
	pEl.classList.add("info");
	const txtNode = document.createTextNode(line);
	pEl.appendChild(txtNode);
	document.getElementById("div-info").appendChild(pEl);
}

// https://stackabuse.com/bytes/remove-all-elements-with-a-class-using-javascript/
function removeInfoLines() {
    const elements = document.getElementsByClassName("info");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function drawCircle(ctx, x, y, r, fillcolor, strokecolor) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.fillStyle = fillcolor;
	ctx.fill();
	if (strokecolor) {
		ctx.lineWidth = 3;
		ctx.strokeStyle = strokecolor;
		ctx.stroke();
	}
}

