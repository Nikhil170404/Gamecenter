let player = {
    name: "Per",
    chips: 200,
    bet: 0
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let betInput = document.getElementById("bet-input")
let lastCardEl = document.getElementById("last-card")

// Retrieve player data from local storage
if (localStorage.getItem('player')) {
    player = JSON.parse(localStorage.getItem('player'));
}

playerEl.textContent = player.name + ": $" + player.chips

function savePlayerData() {
    localStorage.setItem('player', JSON.stringify(player));
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    if (player.bet > 0 && player.bet <= player.chips) {
        isAlive = true;
        let firstCard = getRandomCard();
        let secondCard = getRandomCard();
        cards = [firstCard, secondCard];
        sum = firstCard + secondCard;
        renderGame();
    } else if (player.chips === 0) {
        // If player has 0 chips, give them 200 more chips
        player.chips += 200;
        playerEl.textContent = player.name + ": $" + player.chips;
        startGame(); // Restart the game
    } else {
        message = "Please place a valid bet!";
        renderMessage();
    }
}


function renderGame() {
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }

    sumEl.textContent = "Sum: " + sum;
    if (sum < 21) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack! Congratulations!";
        hasBlackJack = true;
    } else {
        message = "You're out of the game!";
        isAlive = false;
        // Save the player data to local storage when player is out
        savePlayerData();
        // Refresh the page after a delay
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }
    renderMessage();
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

function stand() {
    isAlive = false
    renderGame()
}

function placeBet() {
    let bet = parseInt(betInput.value)
    if (!isNaN(bet) && bet > 0 && bet <= player.chips) {
        player.bet = bet
        player.chips -= bet
        playerEl.textContent = player.name + ": $" + player.chips
        message = "Bet placed! Click 'Start Game' to begin."
        renderMessage()
    } else {
        message = "Please enter a valid bet!"
        renderMessage()
    }
}

function renderMessage() {
    messageEl.textContent = message;
}
