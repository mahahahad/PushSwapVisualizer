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

	updateValues(newValues, append = false) {
		append == false ? this.values = newValues : this.values = [...this.values, ...newValues];
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

const counterEl = document.querySelector(".move-count");

function displayMove(move) {
	movesWrapper.innerHTML += `<p class="move">${move}</p>`;
	counterEl.innerText = ++moves;
}

swapABtn.addEventListener("click", () => {
	stackA.swap();
	displayMove("sa");
});

swapBBtn.addEventListener("click", () => {
	stackB.swap();
	displayMove("sb");
});

swapBothBtn.addEventListener("click", () => {
	if (stackB.values[0] === undefined) {
		if (stackA.values[0] === undefined) return;
		stackA.swap();
		displayMove("ss");
		return;
	}
	stackA.swap(true);
	stackB.swap();
});

pushABtn.addEventListener("click", () => {
	stackB.push(stackA.values.shift());
	stackA.render();
	displayMove("pa");
});

pushBBtn.addEventListener("click", () => {
	stackA.push(stackB.values.shift());
	stackB.render();
	displayMove("pb");
});

rotateABtn.addEventListener("click", () => {
	stackA.rotate();
	displayMove("ra");
});

rotateBBtn.addEventListener("click", () => {
	stackB.rotate();
	displayMove("rb");
});

rotateBothBtn.addEventListener("click", () => {
	stackA.rotate(true);
	stackB.rotate();
	displayMove("rr");
});

reverseRotateABtn.addEventListener("click", () => {
	stackA.reverseRotate();
	displayMove("rra");
});

reverseRotateBBtn.addEventListener("click", () => {
	stackB.reverseRotate();
	displayMove("rrb");
});

reverseRotateBothBtn.addEventListener("click", () => {
	stackA.reverseRotate(true);
	stackB.reverseRotate();
	displayMove("rrr");
});


document.addEventListener("moveMade", () => {
	counterEl.innerText = ++moves;
})

const stackAValuesEl = document.querySelector("#stackAValues");


const addIcon = document.querySelector("#addIcon");
const updateStackOverlay = document.querySelector(".update-stack-wrapper");
function showUpdateStackOverlay() {
	updateStackOverlay.style.display = "flex";	
}
function hideUpdateStackOverlay() {
	updateStackOverlay.style.display = "none";	
	valuesInput.value = "";
}
addIcon.addEventListener("click", () => {
	showUpdateStackOverlay();
})
const closeOverlayIcon = document.querySelector("#closeOverlayIcon");
closeOverlayIcon.addEventListener("click", () => {
	hideUpdateStackOverlay();
})

const valuesInput = document.querySelector("#valuesInput");
const appendValuesCheckbox = document.querySelector("#appendValuesCheckbox");
const stackSelect = document.querySelector("#stackSelect");
const saveStackBtn = document.querySelector("#saveStackBtn");
const manualValueEntryWrapper = document.querySelector("#manualValueEntryWrapper");
const generateValuesWrapper = document.querySelector("#generateValuesWrapper");
saveStackBtn.addEventListener("click", () => {
	// Remove all whitespace characters from the valuesInput
	valuesInput.value = valuesInput.value.replace(/\s+/g, '');
	let valuesArr = valuesInput.value.split(",");
	let appendValuesChecked = appendValuesCheckbox.checked;

	// Check if the manual value entry section is selected and apply the relevant input checks
	if (generateValuesWrapper.classList.contains("wrapper--unselected")) {
		if (valuesInput.value.trim() == "") return;
		valuesArr.forEach((value, index) => {
			if (isNaN(parseInt(value))) {
				alert("You entered wrong values");
			}	  
			valuesArr[index] = parseInt(value);
		})
	} else {
		// Check generateValueWrapper here
	}
	stackSelect.value == 'A' ? 
		stackA.updateValues(valuesArr, appendValuesChecked) :
		stackB.updateValues(valuesArr, appendValuesChecked);
	hideUpdateStackOverlay();
})

const movesWrapper = document.querySelector(".moves-wrapper");

