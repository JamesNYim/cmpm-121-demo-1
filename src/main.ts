import "./style.css";

const COST_MULTIPLIER = 1.15;
const PLANT_BUTTON_FONT_SIZE = "32px"; 
const COUNTER_FONT_SIZE = "20px";
const BUTTON_MARGIN = "10px";
const DAYS_TO_EXPIRE = 7;
const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Plant Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create Button
const button = document.createElement("button");
button.textContent = "🌿";
button.style.fontSize = PLANT_BUTTON_FONT_SIZE;
button.className = "plantButton";
document.body.appendChild(button);

// Counter from Cookies
let counter: number = 0;
const savedCounter = getCookie("counter");
if (savedCounter) counter = parseFloat(savedCounter);

// Growth Rate from Cookies
let growthRate: number = 0;
const savedGrowthRate = getCookie("growthRate");
if (savedGrowthRate) growthRate = parseFloat(savedGrowthRate);
const counterDiv = document.createElement("div");
counterDiv.textContent = `${counter}`;
counterDiv.style.fontSize = COUNTER_FONT_SIZE;
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
interface Item {
  readonly name: string;
  isPurchasable: boolean;
  cost: number;
  rate: number;
  amount: number;
  readonly icon: string;
}

const availableItems: Item[] = [
  {
    name: "farmer",
    isPurchasable: false,
    cost: 10,
    rate: 0.1,
    amount: 0,
    icon: "🧑‍🌾",
  },
  {
    name: "tractor",
    isPurchasable: false,
    cost: 100,
    rate: 2,
    amount: 0,
    icon: "🚜",
  },
  {
    name: "factory",
    isPurchasable: false,
    cost: 1000,
    rate: 50,
    amount: 0,
    icon: "🏭",
  },
];

function createUpgradeButton(item: Item): HTMLButtonElement {
  const button = document.createElement("button");
  button.textContent = `${item.icon} ${item.cost} (${item.rate} / sec)`;
  button.style.fontSize = COUNTER_FONT_SIZE;
  button.style.margin = BUTTON_MARGIN;
  button.disabled = !item.isPurchasable;
  
  button.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      item.cost = parseFloat((item.cost * COST_MULTIPLIER).toFixed(2));
      button.textContent = `${item.icon} ${item.cost} (${item.rate} / sec)`;
      growthRate += item.rate;
      counterDiv.textContent = `${counter.toFixed(2)}`;
      checkUpgradeAvailability();
      updateGrowthRate();
    }
  });

  return button;
}

// Rendering the upgrade items
availableItems.forEach((item) => {
  const savedItemCost = getCookie(item.name + "cost");
  if (savedItemCost) item.cost = parseFloat(savedItemCost);

  const button = createUpgradeButton(item);
  document.body.appendChild(button);
});

const growthRateDiv = document.createElement("div");
growthRateDiv.style.fontSize = COUNTER_FONT_SIZE;
document.body.appendChild(growthRateDiv);
updateGrowthRate();

const saveButton = document.createElement("button");
document.body.appendChild(saveButton);
saveButton.textContent = "Save";
saveButton.addEventListener("click", saveState);

function updateGrowthRate() {
  growthRateDiv.textContent = `${growthRate.toFixed(2)} plants / second`;
  console.log("Updating growth rate");
}

function checkUpgradeAvailability() {
  availableItems.forEach((item, index) => {
    const button = document.querySelectorAll("button")[index + 1]; // Assumes the game button is the first, +1 for offset
    item.isPurchasable = counter >= item.cost;
    button.disabled = !item.isPurchasable;
  });
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000,
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function saveState() {
  setCookie("counter", counter.toString(), DAYS_TO_EXPIRE);
  setCookie("growthRate", growthRate.toString(), DAYS_TO_EXPIRE);
  availableItems.forEach((item) => {
    setCookie(item.name + "cost", item.cost.toString(), DAYS_TO_EXPIRE);
  });
}
