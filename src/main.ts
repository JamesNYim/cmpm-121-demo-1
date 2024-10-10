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
    const delta = timestamp - lastTimestamp
    counter += (growthRate * delta) / 1000;
    counterDiv.textContent = `${counter.toFixed(1)}`;
    checkUpgradeAvailability();
  }
  lastTimestamp = timestamp;
  requestAnimationFrame(incrementCounter);
}
requestAnimationFrame(incrementCounter);

// Upgrade Buttons
// Farmer Upgrade
const farmerUpgrade = document.createElement("button");
let farmerUpgradeCounter = 0;
farmerUpgrade.textContent = "🧑‍🌾";
farmerUpgrade.style.fontSize = "20px";
farmerUpgrade.style.margin = "5%";
farmerUpgrade.disabled = true;
document.body.appendChild(farmerUpgrade);
farmerUpgrade.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    farmerUpgradeCounter++;
    growthRate += 0.1;
    counterDiv.textContent = `${counter}`;
    farmerUpgrade.textContent = `${farmerUpgradeCounter}🧑‍🌾`;
    checkUpgradeAvailability();
    updateGrowthRate();
  }
});

// Tractor Upgrade
const tractorUpgrade = document.createElement("button");
let tractorUpgradeCounter = 0;
tractorUpgrade.textContent = "🚜";
tractorUpgrade.style.fontSize = "20px";
tractorUpgrade.style.margin = "5%";
tractorUpgrade.disabled = true;
document.body.appendChild(tractorUpgrade);
tractorUpgrade.addEventListener("click", () => {
  if (counter >= 100) {
    counter -= 100;
    growthRate += 1;
    tractorUpgradeCounter++;
    tractorUpgrade.textContent = `${tractorUpgradeCounter}🚜`;
    counterDiv.textContent = `${counter}`;
    checkUpgradeAvailability();
    updateGrowthRate();
  }
});

// Factory Upgrade
const factoryUpgrade = document.createElement("button");
let factoryUpgradeCounter = 0;
factoryUpgrade.textContent = "🏭";
factoryUpgrade.style.fontSize = "20px";
factoryUpgrade.style.margin = "5%";
factoryUpgrade.disabled = true;
document.body.appendChild(factoryUpgrade);
factoryUpgrade.addEventListener("click", () => {
  if (counter >= 1000) {
    counter -= 1000;
    growthRate += 2;
    factoryUpgradeCounter++;
    factoryUpgrade.textContent = `${factoryUpgradeCounter} 🏭`;
    counterDiv.textContent = `${counter}`;
    checkUpgradeAvailability();
    updateGrowthRate();
  }
});

// Checking for upgrades
function checkUpgradeAvailability() {
  farmerUpgrade.disabled = counter < 10;
  tractorUpgrade.disabled = counter < 100;
  factoryUpgrade.disabled = counter < 1000;
}

const growthRateDiv = document.createElement("text");
document.body.appendChild(growthRateDiv);
function updateGrowthRate() {
  growthRateDiv.textContent = `${growthRate.toFixed(2)} plants / second`;
}
