let quantity;
const firstDiv = document.querySelector(".cards:first-of-type");
const secondDiv = document.querySelector(".cards:last-of-type");

function evenPrompt() {
  while (true) {
    quantity = prompt("Digite um número par de 4 a 14.");
    if (quantity >= 4 && quantity <= 14 && quantity % 2 === 0) {
      break;
    } else {
      alert("Número inválido. Digite um número par de 4 a 14.");
    }
  }
}

function addCards() {
  if (quantity <= 7) {
    secondDiv.style.display = "none";

    for (let i = 1; i <= quantity; i++) {
      const newCard = document.createElement("div");
      newCard.className = "card";
      newCard.innerHTML = `
      <div class="front-face face"><img src="./assets/back.png" /></div>
      <div class="back-face face"></div>
    `;
      firstDiv.appendChild(newCard);
    }
  } else {
    secondDiv.style.display = "flex";

    const cardsPerDiv = quantity / 2;
    for (let i = 1; i <= cardsPerDiv; i++) {
      const newCard = document.createElement("div");
      newCard.className = "card";
      newCard.innerHTML = `
      <div class="front-face face"><img src="./assets/back.png" /></div>
      <div class="back-face face"></div>
    `;
      firstDiv.appendChild(newCard);
    }

    for (let i = cardsPerDiv + 1; i <= quantity; i++) {
      const newCard = document.createElement("div");
      newCard.className = "card";
      newCard.innerHTML = `
      <div class="front-face face"><img src="./assets/back.png" /></div>
      <div class="back-face face"></div>
    `;
      secondDiv.appendChild(newCard);
    }
  }
}

evenPrompt();
addCards();
