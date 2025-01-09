const board = document.getElementById('board');
const cardsArray = [];
const flippedCards = [];
let cardValues = [];
let attempts = 0;
let startTime = null; 
let timerInterval = null; 

function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

function updateTimer() {
  const currentTime = new Date();
  const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
  document.getElementById('timer').textContent = `Time: ${elapsedSeconds} seconds`;
}

function flipCard(index) {
  if (flippedCards.length === 2 || cardsArray[index].classList.contains('flipped')) {
    return;
  }

  const cardElement = cardsArray[index];
  cardElement.textContent = cardValues[index];
  cardElement.classList.add('flipped');
  flippedCards.push(index);

  if (flippedCards.length === 2) {
    attempts++;
    document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
    checkMatch();
  }
}

function checkMatch() {
  const firstIndex = flippedCards[0];
  const secondIndex = flippedCards[1];

  const firstCard = cardsArray[firstIndex];
  const secondCard = cardsArray[secondIndex];

  if (cardValues[firstIndex] === cardValues[secondIndex]) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    flippedCards.length = 0;
    checkGameOver();
  } else {
    setTimeout(() => {
      firstCard.textContent = '';
      secondCard.textContent = '';
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      flippedCards.length = 0;
    }, 1000);
  }
}

function checkGameOver() {
  if (cardsArray.every(card => card.classList.contains('matched'))) {
    clearInterval(timerInterval); 
    const endTime = new Date(); 
    const timeTaken = Math.floor((endTime - startTime) / 1000); 
    setTimeout(() => alert(`Game Over! Total attempts: ${attempts}. Time taken: ${timeTaken} seconds`), 500);
  }
}

function initializeBoard(pairCount) {
  board.innerHTML = '';
  cardsArray.length = 0;
  flippedCards.length = 0;
  attempts = 0;
  document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
  document.getElementById('timer').textContent = `Time: 0 seconds`;

  cardValues = [];
  for (let i = 1; i <= pairCount; i++) {
    cardValues.push(i);
    cardValues.push(i);
  }
  shuffleCards(cardValues);

  for (let i = 0; i < cardValues.length; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.addEventListener('click', () => flipCard(i));
    board.appendChild(card);
    cardsArray.push(card);
  }

  startTime = new Date(); 
  clearInterval(timerInterval); 
  timerInterval = setInterval(updateTimer, 1000); 
}

document.getElementById('startGame').addEventListener('click', () => {
  const pairCount = parseInt(document.getElementById('pairs').value, 10);
  if (isNaN(pairCount) || pairCount < 1 || pairCount > 30) {
    alert('Please choose a valid number between 1 and 30.');
    return;
  }
  initializeBoard(pairCount);
});

initializeBoard(5);
