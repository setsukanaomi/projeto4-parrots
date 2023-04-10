let quantity;
let moves = 0;
let selectedCards = [];
let selectedCardsImgs = [];
const cardBacks = document.querySelectorAll(".back-face");
const firstDiv = document.querySelector(".cards:first-of-type");
const secondDiv = document.querySelector(".cards:last-of-type");
const imgs = [
  "./assets/imgs/bobrossparrot.gif",
  "./assets/imgs/explodyparrot.gif",
  "./assets/imgs/fiestaparrot.gif",
  "./assets/imgs/metalparrot.gif",
  "./assets/imgs/revertitparrot.gif",
  "./assets/imgs/tripletsparrot.gif",
  "./assets/imgs/unicornparrot.gif",
];

evenPrompt(); //Prompt;
addCards(); //Adiciona cartas;

// Função do prompt número par---------------------------------------------------------------

function evenPrompt() {
  //Função do prompt de número par 4 até 14;
  while (true) {
    quantity = prompt("Digite um número par de 4 a 14.");
    if (quantity >= 4 && quantity <= 14 && quantity % 2 === 0) {
      break;
    } else {
      alert("Número inválido. Digite um número par de 4 a 14.");
    }
  }
}

//-------------------------------------------------------------------------------------------

// Função que adiciona cartas----------------------------------------------------------------

function addCards() {
  const imgPairs = [];
  for (let i = 0; i < quantity / 2; i++) {
    const randomImgIndex = Math.floor(Math.random() * imgs.length);
    const img = imgs[randomImgIndex];
    imgPairs.push(img, img);
    imgs.splice(randomImgIndex, 1);
  }

  for (let i = imgPairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [imgPairs[i], imgPairs[j]] = [imgPairs[j], imgPairs[i]];
  }

  if (quantity <= 7) {
    secondDiv.style.display = "none";

    for (let i = 1; i <= quantity; i++) {
      const newCard = document.createElement("div");
      newCard.className = "card";
      newCard.innerHTML = `
      <div class="front-face face"><img data-test="face-down-image" src="./assets/front.png" /></div>
       <div class="back-face face"><img data-test="face-up-image" src="${
         imgPairs[i - 1]
       }" /></div>
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
      <div class="front-face face"><img data-test="face-down-image" src="./assets/front.png" /></div>
       <div class="back-face face"><img data-test="face-up-image" src="${
         imgPairs[i - 1]
       }" /></div>
    `;
      firstDiv.appendChild(newCard);
    }

    for (let i = cardsPerDiv + 1; i <= quantity; i++) {
      const newCard = document.createElement("div");
      newCard.className = "card";
      newCard.innerHTML = `
      <div class="front-face face"><img data-test="face-down-image" src="./assets/front.png" /></div>
       <div class="back-face face"><img data-test="face-up-image" src="${
         imgPairs[i - 1]
       }" /></div>
    `;
      secondDiv.appendChild(newCard);
    }
  }
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.addEventListener("click", cardClickHandler));
}

//---------------------------------------------------------------------------------------------

//Função que adiciona o data-test nas cartas----------------------------------------------------

const minhaClasse = document.querySelectorAll(".card");

for (let i = 0; i < minhaClasse.length; i++) {
  minhaClasse[i].setAttribute("data-test", "card");
}
//----------------------------------------------------------------------------------------------

// Função que vira a carta----------------------------------------------------------------------

const cardsFlip = document.querySelectorAll(".card");
cardsFlip.forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.add("flipped");
  });
});

//-----------------------------------------------------------------------------------------------

//Função que adiciona o evento de comparar nas duas cartas selecionadas--------------------------

function cardClickHandler(event) {
  const card = event.currentTarget;
  if (!card.classList.contains("flipped") && selectedCards.length < 2) {
    card.classList.add("flipped");
    selectedCards.push(card);
    selectedCardsImgs.push(card.querySelector(".back-face img").src);
    if (selectedCards.length === 2) {
      moves++;
      compareCards();
    } else {
      moves++;
    }
  }
}

//------------------------------------------------------------------------------------------------

//Função que compara cartas-----------------------------------------------------------------------
function compareCards() {
  const [firstCardImg, secondCardImg] = selectedCardsImgs;
  if (firstCardImg === secondCardImg) {
    selectedCards.forEach((card) =>
      card.removeEventListener("click", cardClickHandler)
    );
    selectedCards = [];
    selectedCardsImgs = [];
  } else {
    setTimeout(() => {
      selectedCards.forEach((card) => card.classList.remove("flipped"));
      selectedCards = [];
      selectedCardsImgs = [];
    }, 1000);
  }
  checkGameEnd();
}
//------------------------------------------------------------------------------------------------

function checkGameEnd() {
  const cards = document.querySelectorAll(".card");
  const flippedCards = document.querySelectorAll(".flipped");
  if (cards.length === flippedCards.length) {
    alert(`Parabéns! Você venceu o jogo com ${moves} jogadas.`);
  }
}
