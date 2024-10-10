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
    const delta = timestamp - lastTimestamp;
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
interface Item {
  readonly name: string,
  isPurchasable: boolean
  cost: number,
  rate: number,
  amount: number,
  readonly icon: string,
};

const availableItems : Item[] = [
  {name: "farmer", isPurchasable: false, cost: 10, rate: 0.1, amount: 0, icon:"🧑‍🌾"},
  {name: "tractor", isPurchasable: false, cost: 100, rate: 2, amount:0, icon:"🚜"},
  {name: "factory", isPurchasable: false, cost: 1000, rate: 50, amount: 0, icon:"🏭"}
]

// Rendering the upgrade items
availableItems.forEach((item) => {
  const button = document.createElement("button");
  button.textContent = `${item.icon} ${item.cost} (${item.rate} / sec)`;
  button.style.fontSize = "20px";
  button.style.margin = "10px";
  button.disabled = !item.isPurchasable;
  document.body.appendChild(button);

  button.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      item.cost = parseFloat((item.cost * 1.15).toFixed(2)); 
      button.textContent = `${item.icon} ${item.cost} (${item.rate} / sec)`;
      growthRate += item.rate;
      counterDiv.textContent = `${counter.toString(2)}`;
      checkUpgradeAvailability();
      updateGrowthRate();
    }
  });
});
const growthRateDiv = document.createElement("div");
growthRateDiv.style.fontSize = "20px";
document.body.appendChild(growthRateDiv);
updateGrowthRate();

function updateGrowthRate() {
  growthRateDiv.textContent = `${growthRate.toFixed(2)} plants / second`;
  console.log("Updating growth rate");
}

function checkUpgradeAvailability() {
  availableItems.forEach((item, index) => {
    const button = document.querySelectorAll("button")[index + 1];  // Assumes the game button is the first, +1 for offset
    item.isPurchasable = counter >= item.cost;
    button.disabled = !item.isPurchasable;
  });
}


