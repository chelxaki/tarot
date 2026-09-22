const MAJOR_ARCANA = [
  "The Fool",
  "The Magician",
  "The High Priestess",
  "The Empress",
  "The Emperor",
  "The Hierophant",
  "The Lovers",
  "The Chariot",
  "Strength",
  "The Hermit",
  "Wheel of Fortune",
  "Justice",
  "The Hanged Man",
  "Death",
  "Temperance",
  "The Devil",
  "The Tower",
  "The Star",
  "The Moon",
  "The Sun",
  "Judgement",
  "The World",
];

const MINOR_SUITS = ["Wands", "Cups", "Swords", "Pentacles"];
const MINOR_RANKS = [
  "Ace",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Page",
  "Knight",
  "Queen",
  "King",
];

const MINOR_ARCANA = MINOR_SUITS.flatMap((suit) =>
  MINOR_RANKS.map((rank) => `${rank} of ${suit}`)
);

const DECK = [...MAJOR_ARCANA, ...MINOR_ARCANA];

function drawThreeCards() {
  const indices = new Set();
  while (indices.size < 3) {
    indices.add(Math.floor(Math.random() * DECK.length));
  }
  return [...indices].map((i) => DECK[i]);
}

const form = document.getElementById("question-form");
const questionInput = document.getElementById("question-input");
const errorMessage = document.getElementById("error-message");
const resultsSection = document.getElementById("results");
const cardList = document.getElementById("card-list");

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.hidden = true;
}

const CARD_POSITIONS = ["Past", "Present", "Future"];

function renderCards(cards) {
  cardList.innerHTML = "";
  cards.forEach((cardName, index) => {
    const li = document.createElement("li");
    li.className = "tarot-card";

    const position = document.createElement("span");
    position.className = "card-position";
    position.textContent = CARD_POSITIONS[index];

    const face = document.createElement("div");
    face.className = "card-face";

    const glyph = document.createElement("span");
    glyph.className = "card-glyph";
    glyph.setAttribute("aria-hidden", "true");
    glyph.textContent = "✦";

    const name = document.createElement("span");
    name.className = "card-name";
    name.textContent = cardName;

    face.appendChild(glyph);
    face.appendChild(name);
    li.appendChild(position);
    li.appendChild(face);
    cardList.appendChild(li);
  });
  resultsSection.hidden = false;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = questionInput.value.trim();

  if (!question) {
    showError("Please enter a question before drawing.");
    resultsSection.hidden = true;
    return;
  }

  clearError();
  const cards = drawThreeCards();
  renderCards(cards);
});
