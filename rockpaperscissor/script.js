document.addEventListener("DOMContentLoaded", function() {
    let game = ["🗿", "📃", "✂️"];
    let startEl1 = document.getElementById("start-el1");
    let startEl2 = document.getElementById("start-el2");
    let startEl3 = document.getElementById("start-el3");
    let emojiEl = document.getElementById("emoji-el");
    let playerScore = 0;
    let computerScore = 0;
    let tieScore = 0;
    let highestScore = 0;
    let playerScoreDisplay = document.getElementById("player-score");
    let computerScoreDisplay = document.getElementById("computer-score");
    let tieScoreDisplay = document.getElementById("tie-score");
    let highestScoreDisplay = document.getElementById("highest-score");

    // Retrieve highest score from local storage
    if(localStorage.getItem('highestScore')) {
        highestScore = parseInt(localStorage.getItem('highestScore'));
        updateScore(); // Update the display with the highest score
    } else {
        updateScore(); // Initialize the display with the highest score (which is initially 0)
    }

    // Display initial scores
    function updateScore() {
        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
        tieScoreDisplay.textContent = tieScore;
        highestScoreDisplay.textContent = "High Score :" + highestScore;
        localStorage.setItem('highestScore', highestScore); // Store the highest score in local storage
    }

    // Function to reset the scores and update the display
    function resetScores() {
        playerScore = 0;
        computerScore = 0;
        tieScore = 0;
        updateScore();
    }

    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            tieScore++;
            updateScore();
            return "It's a tie!";
        } else if (
            (playerChoice === "🗿" && computerChoice === "✂️") ||
            (playerChoice === "📃" && computerChoice === "🗿") ||
            (playerChoice === "✂️" && computerChoice === "📃")
        ) {
            playerScore++;
            if (playerScore > highestScore) {
                highestScore = playerScore;
            }
            updateScore();
            return "You win!";
        } else {
            computerScore++;
            updateScore();
            return "You lose!";
        }
    }
    

    function refreshGame() {
        resetScores(); // Reset all scores and update the display
        emojiEl.textContent = "";
    }

    startEl1.addEventListener("click", function () {
        let playerChoice = "🗿";
        let computerChoice = game[Math.floor(Math.random() * 3)];
        determineWinner(playerChoice, computerChoice);
        let result = determineWinner(playerChoice, computerChoice);
        emojiEl.textContent = `You: ${playerChoice}, Computer: ${computerChoice}. ${result}`;
    });

    startEl2.addEventListener("click", function () {
        let playerChoice = "📃";
        let computerChoice = game[Math.floor(Math.random() * 3)];
        determineWinner(playerChoice, computerChoice);
        let result = determineWinner(playerChoice, computerChoice);
        emojiEl.textContent = `You: ${playerChoice}, Computer: ${computerChoice}. ${result}`;
    });

    startEl3.addEventListener("click", function () {
        let playerChoice = "✂️";
        let computerChoice = game[Math.floor(Math.random() * 3)];
        determineWinner(playerChoice, computerChoice);
        let result = determineWinner(playerChoice, computerChoice);
        emojiEl.textContent = `You: ${playerChoice}, Computer: ${computerChoice}. ${result}`;
    });
});
