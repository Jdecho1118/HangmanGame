const wordList = [
    {
        word: "ENGINE",
        hint: "The power-producing component of a vehicle."
    },
    {
        word: "TRANSMISSION",
        hint: "The mechanism that controls the application of power from the engine to the wheels."
    },
    {
        word: "BRAKE",
        hint: "A device for slowing or stopping the motion of a vehicle."
    },
    {
        word: "TIRE",
        hint: "A rubber covering around a wheel that provides traction and acts as a cushion."
    },
    {
        word: "BATTERY",
        hint: "A device that stores electrical energy for starting the engine and powering electrical systems."
    },
    {
        word: "EXHAUST",
        hint: "The system that channels and expels gases produced during engine combustion."
    },
    {
        word: "STEERING WHEEL",
        hint: "The control used for steering a vehicle."
    },
    {
        word: "SUSPENSION",
        hint: "The system of springs, shock absorbers, and linkages that connect a vehicle to its wheels."
    },
    {
        word: "HEADLIGHT",
        hint: "A front-facing light on a vehicle used to illuminate the road ahead."
    },
    {
        word: "PROCESSOR",
        hint: "The central processing unit (CPU) responsible for executing instructions in a computer."
    },
    {
        word: "MOTHERBOARD",
        hint: "The main circuit board that houses the CPU, memory, and other essential components."
    },
    {
        word: "MEMORY",
        hint: "Storage space in a computer used for temporary data storage and fast access by the CPU."
    },
    {
        word: "HARD DRIVE",
        hint: "A device for storing and retrieving digital information, typically long-term storage."
    },
    {
        word: "GRAPHICS CARD",
        hint: "A component responsible for rendering images and videos on a computer display."
    },
    {
        word: "POWER SUPPLY",
        hint: "A component that provides electrical power to the other components of a computer."
    },
    {
        word: "KEYBOARD",
        hint: "A peripheral input device used for typing characters and commands into a computer."
    },
    {
        word: "MONITOR",
        hint: "A display device that visually presents information from the computer."
    }
];



const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

// Initializing game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Ressetting game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; // Making currentWord as random word
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    // After game complete.. showing modal with relevant details
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = `${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true; // Disabling the clicked button 
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Calling gameOver function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);