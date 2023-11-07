const stackAContents = document.querySelector("#stackAContents");
const stackBContents = document.querySelector("#stackBContents");

const MoveMade = new Event("moveMade");

class Stack {
	constructor(contentsEl, values = []) {
		// The HTML element for displaying the contents
		this.contentsEl = contentsEl;

		// The array holding all the values
		this.values = values;

		// Render as soon as initalized
		this.render();
	}

	updateValues(newValues) {
		this.values = newValues;
		this.render();
	}

	// Render each value to the content element
	render() {
		this.contentsEl.innerHTML = "";
		if (this.values[0] === undefined) return;
		this.values.forEach(value => {
			this.contentsEl.innerHTML += `<div class="node">${value}</div>`;
		});
	}

	// Move the first element down and second element up
	swap(ignoreMove = false) {
		if (this.values[0] === undefined) return;
		let firstEl = this.values[0];
		this.values[0] = this.values[1];
		this.values[1] = firstEl;
		this.render();
		if (ignoreMove) return;
		document.dispatchEvent(MoveMade);
	}

	// Move element to top of stack
	push(value) {
		if (value === undefined) return;
		this.values.unshift(value);
		this.render();
		document.dispatchEvent(MoveMade);
	}

	// Move top element to bottom and every element up by one
	rotate(ignoreMove = false) {
		if (this.values[0] === undefined) return;
		this.values.push(this.values.shift());
		this.render();
		if (ignoreMove) return;
		document.dispatchEvent(MoveMade);
	}

	// Move bottom element to top and every element down by one
	reverseRotate(ignoreMove = false) {
		if (this.values[0] === undefined) return;
		this.values.unshift(this.values.pop());
		this.render();
		if (ignoreMove) return;
		document.dispatchEvent(MoveMade);
	}
}

let moves = 0;

const stackA = new Stack(stackAContents);
const stackB = new Stack(stackBContents);

const swapABtn = document.querySelector("#swapABtn");
const swapBBtn = document.querySelector("#swapBBtn");
const swapBothBtn = document.querySelector("#swapBothBtn");
const pushABtn = document.querySelector("#pushABtn");
const pushBBtn = document.querySelector("#pushBBtn");
const rotateABtn = document.querySelector("#rotateABtn");
const rotateBBtn = document.querySelector("#rotateBBtn");
const rotateBothBtn = document.querySelector("#rotateBothBtn");
const reverseRotateABtn = document.querySelector("#reverseRotateABtn");
const reverseRotateBBtn = document.querySelector("#reverseRotateBBtn");
const reverseRotateBothBtn = document.querySelector("#reverseRotateBothBtn");

const counterEl = document.querySelector(".moves");

swapABtn.addEventListener("click", () => {
	stackA.swap();
});

swapBBtn.addEventListener("click", () => {
	stackB.swap();
});

swapBothBtn.addEventListener("click", () => {
	stackA.swap(true);
	stackB.swap();
});

pushABtn.addEventListener("click", () => {
	stackB.push(stackA.values.shift());
	stackA.render();
});

pushBBtn.addEventListener("click", () => {
	stackA.push(stackB.values.shift());
	stackB.render();
});

rotateABtn.addEventListener("click", () => {
	stackA.rotate();
});

rotateBBtn.addEventListener("click", () => {
	stackB.rotate();
});

rotateBothBtn.addEventListener("click", () => {
	stackA.rotate(true);
	stackB.rotate();
});

reverseRotateABtn.addEventListener("click", () => {
	stackA.reverseRotate();
});

reverseRotateBBtn.addEventListener("click", () => {
	stackB.reverseRotate();
});

reverseRotateBothBtn.addEventListener("click", () => {
	stackA.reverseRotate(true);
	stackB.reverseRotate();
});


document.addEventListener("moveMade", () => {
	counterEl.innerText = ++moves;
})

const stackAValuesEl = document.querySelector("#stackAValues");
const replaceStackAValuesEl = document.querySelector("#replaceStackAValues");

replaceStackAValues.addEventListener("click", () => {
	stackA.updateValues(stackAValuesEl.value.split(", "));
});

