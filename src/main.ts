import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Plant Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create Button
const button = document.createElement('button');
button.textContent = '🌿';
button.style.fontSize = '32px';
button.className = 'plantButton';
document.body.appendChild(button);