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
let growthRate: number = 0;
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter}`;
counterDiv.style.margin = "10px 0";
counterDiv.style.fontSize = "20px";
document.body.appendChild(counterDiv);

// Click behavior
button.addEventListener("click", () => {
  counter += 1;
  counterDiv.textContent = `${counter}`;
  checkUpgradeAvailability();
});

// Tracking time for requestAnimationFrame
let lastTimestamp: number;
function incrementCounter(timestamp: number) {
  if (lastTimestamp !== undefined) {
    counter += growthRate / 1000;
    counterDiv.textContent = `${counter.toFixed(2)}`;
    checkUpgradeAvailability();
  }
  lastTimestamp = timestamp;
  requestAnimationFrame(incrementCounter);
}
requestAnimationFrame(incrementCounter);

// Upgrade Button
const upgradeButton = document.createElement("button");
upgradeButton.textContent = "Upgrade";
upgradeButton.style.fontSize = "20px";
upgradeButton.disabled = true;
document.body.appendChild(upgradeButton);

upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    counterDiv.textContent = `${counter}`;
    checkUpgradeAvailability();
  }
});
// Checking for upgrades
function checkUpgradeAvailability() {
  upgradeButton.disabled = counter < 10;
}
