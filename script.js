let computerChoice;

    const score = JSON.parse(localStorage.getItem('save')) || {
        Wins: 0,
        Loss: 0,
        Ties: 0
    };

    let result;
    
    function choice() {
        let random = Math.random();
        
        if (random > 0 && random <= 1/3) {
            computerChoice = 'rock';
        } else if (random > 1/3 && random <= 2/3) {
            computerChoice = 'paper';
        } else if (random > 2/3 && random <= 1) {
            computerChoice = 'scissors';
        }
    };  


    function updateCurrent(variable) {
   
    const Current  = document.querySelector('.current');
    Current.innerHTML = `${result}`;

    const Choice = document.querySelector('.choice');
    Choice.innerHTML = `You 
        <img src="icons/${variable}-emoji.png" class="move-icon">
        VS
        <img src="icons/${computerChoice}-emoji.png" class="move-icon">
        Computer`;


    
    const Score = document.querySelector('.score');
    Score.innerHTML = `Wins: ${score.Wins}, Losses: ${score.Loss}, Ties: ${score.Ties}`
}


document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
       
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
       
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('scissors');
       
    });



document.querySelector('.js-autoPlay-button')
    .addEventListener('click', () => {
        toggleAutoPlay();
    })


document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r'){
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
});
const dialog = document.querySelector('.reset-dialog');

document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
        dialog.classList.remove('remove');
    })

document.querySelector('.dialog-yes-button')
.addEventListener('click', () => {
    resetScore();
    dialog.classList.add('remove');
})

document.querySelector('.dialog-no-button')
.addEventListener('click', () => {
    dialog.classList.add('remove');
})


function playGame(humanChoice) {

         choice();


        if (humanChoice === 'rock') {

            if (computerChoice === 'rock') {
                score.Ties++;
                result = "Draw!";

            } else if (computerChoice === 'paper') {
                score.Loss++;
                result = "You LOST!";

            } else if (computerChoice === 'scissors') {
                score.Wins++;
                result = "You WON!";
            }


        } else if (humanChoice === 'paper') {

            if (computerChoice === 'paper') {
                score.Ties++;
                result = "Draw!";

            } else if (computerChoice === 'scissors') {
                score.Loss++;
                result = "You LOST!";

            } else if (computerChoice === 'rock') {
                score.Wins++;
                result = "You WON!";
            }


        } else if (humanChoice === 'scissors') {

            if (computerChoice === 'scissors') {
                score.Ties++;
                result = "Draw!";

            } else if (computerChoice === 'rock') {
                score.Loss++;
                result = "You LOST!";

            } else if (computerChoice === 'paper') {
                score.Wins++;
                result = "You WON!";
            }
        }
        updateCurrent(humanChoice);
        localStorage.setItem('save', JSON.stringify(score));
       

    }
  
function resetScore() {
    score.Wins = 0;
    score.Loss = 0;
    score.Ties = 0;
    
    
    const reset = document.querySelector('.score');
    reset.innerHTML = `Wins: ${score.Wins}, Losses: ${score.Loss}, Ties: ${score.Ties}`
    localStorage.removeItem('save');
    alert("Score Reset!");
}

function autoPlay() {
    let num = Math.random();
    let autoHumanChoice;

    if (num > 0 && num <= 1/3) {
        autoHumanChoice = 'rock';
    } else if (num > 1/3 && num <= 2/3) {
        autoHumanChoice = 'paper';
    } else if (num > 2/3 && num <= 1) {
        autoHumanChoice = 'scissors';
    }
   
    playGame(autoHumanChoice);
    updateCurrent(autoHumanChoice);
}

let intervalId;

function toggleAutoPlay() {
    const buttonTxt = document.querySelector('.auto-play');

    if (buttonTxt.textContent === 'Auto Play') {
        buttonTxt.textContent = 'Stop Play';
        intervalId = setInterval(autoPlay, 1500);
    } else {
        buttonTxt.textContent = 'Auto Play';
        clearInterval(intervalId);
    }
}
