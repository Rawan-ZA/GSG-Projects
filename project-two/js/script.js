//basic variable of game
const startButton =          document.querySelector('.intro .start')
const introScreen =      document.querySelector('.intro')
// let  game =             document.querySelector('.container')
const cardValues = ["😎","😃","😄","🙂","🍕","🍔","🚗","🌎","🥑","🍩","🤩","👻","🎈","🎃","🎁","🎀",
                    "🎄","🥼","🦺","⚽","🎮","🎵","📸","⌚","⌛","💎","🐠","💪","👍","🍓","🌭","🎂"]; 
var gridSize = 4;  //default size
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let isFlipped = false;
const gameContainer = document.getElementById('game-container');
const restartButton = document.getElementById('restart-button');
const increaseSizeButton = document.getElementById('increase-size-button');
// Event listeners
restartButton.addEventListener('click', restartGame);
increaseSizeButton.addEventListener('click', increaseGridSize);
startButton.addEventListener("click", () => {
  createGameGrid()
  restartButton.classList.remove('fadeOut')
  increaseSizeButton.classList.remove('fadeOut')
  });
// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// Function to create and render the game grid
function createGameGrid() {
   introScreen.classList.add("fadeOut");
   gameContainer.classList.add("fadeIn");
   shuffle(cardValues);
   cards = [...cardValues.slice(0, gridSize * gridSize / 2), ...cardValues.slice(0, gridSize * gridSize / 2)]; //split main array
   shuffle(cards);
   gameContainer.innerHTML = '';
   for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
          const value = cards[i * gridSize + j];
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = value;
          if(card.innerHTML == "undefined"){
            this.card.remove()
          }
          card.addEventListener('click', handleCardClick);
          gameContainer.appendChild(card);
      }
  }
}
// Function to handle card click
function handleCardClick(event) {
  if (isFlipped) return;
  const card = event.target;
  if (!card.classList.contains('flip') && flippedCards.length < 2) {
      card.classList.add('flip');
      flippedCards.push(card);
      if (flippedCards.length === 2) {
          isFlipped = true;
          setTimeout(checkForMatch,500);
      }
  }
}
// Function to check for card match
function checkForMatch() {
  var card1 = document.querySelectorAll(".flip")[0]
  var card2 = document.querySelectorAll(".flip")[1];

  if (card1.innerHTML == card2.innerHTML) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      card2.classList.remove("flip");
      card1.classList.remove("flip");
      matchedPairs++;
      if (matchedPairs == cards.length /2) {
          const pop_up = document.querySelector('.pop-up')
          const close = document.querySelector('.close')
          pop_up.classList.add('active')
          close.addEventListener('click',()=>{
            pop_up.classList.remove('active')
            restartGame()
          })
      }
  } else {
      // Add the shake animation class
      card1.classList.add('shake');
      card2.classList.add('shake');
      // Remove the shake animation class after a short delay
      setTimeout(() => {
          card1.classList.remove('shake');
          card2.classList.remove('shake');
      },500); // Adjust the duration to match your CSS animation
      card1.classList.remove('flip');
      card2.classList.remove('flip');
  }
  flippedCards = [];
  isFlipped = false;
}

function restartGame() {
  window.location.reload()
  createGameGrid();
}
// Function to increase the grid size
function increaseGridSize() {
  gridSize += 2; // Increase grid size by 2
    gameContainer.style.gridTemplateColumns = `repeat(${gridSize},75px)`;
    gameContainer.style.gridTemplateRows = `repeat(${gridSize},75px)`;
    gameContainer.style.fontSize='2rem'
  if(gridSize>8){
    alert('Your are arrive to maximum size of game')
    window.location.reload()
  }
  createGameGrid()
}
