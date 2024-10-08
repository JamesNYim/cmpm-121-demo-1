import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Plant Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create Button
const button = document.createElement("button");
button.textContent = "🌿";
button.style.fontSize = "32px";
button.className = "plantButton";
document.body.appendChild(button);

// Counter
let counter: number = 0;
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter}`;
counterDiv.style.margin = "10px 0";
counterDiv.style.fontSize = "20px";
document.body.appendChild(counterDiv);

// Click behavior
button.addEventListener("click", () => {
  counter += 1;
  counterDiv.textContent = `${counter}`;
});

// Tracking time for requestAnimationFrame
let lastTimestamp: number;
function incrementCounter(timestamp: number) {
	if (lastTimestamp !== undefined) {
		const elapsed = timestamp - lastTimestamp;
		counter += elapsed / 1000;
		counterDiv.textContent = `${counter.toFixed(2)}`
	}
	lastTimestamp = timestamp;
	requestAnimationFrame(incrementCounter);
}

requestAnimationFrame(incrementCounter);