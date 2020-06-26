/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Step 1:  Create fundamentals variables

var scores, roundScore, activePlayer, gamePlaying, lastDice = 0;

init();


//Setting up event handler


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random Number
        //var dice = 6; // for testing
        var dice = Math.floor(Math.random() * 6) + 1;
        console.log('dice = ' + dice);
        console.log('lastdice = ' + lastDice);
        console.log('==================');

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        // 3. Update the roundScore If the rolled number is not 1 
        if (lastDice === 6 && dice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            console.log('OOPS!!! Player ' + (activePlayer + 1) + ' You hit two sixes continuously!!!');
            alert('OOPS!!! Player ' + (activePlayer + 1) + ' You hit two sixes continuously!!!');
            nextPlayer();
            lastDice = 0;

        } else if (dice !== 1) {
            //Add Score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            lastDice = dice;
        } else {
            //Next Player
            console.log('SORRY!!! Player ' + (activePlayer + 1) + ' You hit one.');
            alert('SORRY!!! Player ' + (activePlayer + 1) + ' You hit one.');
            nextPlayer();
            lastDice = 0;
        }

    }

}); 


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;
        
        // Set lastDice to zero
        lastDice = 0;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        console.log('Congratulations! Player ' + (activePlayer +1) + '...' + roundScore + ' points had been added to your score');

        var winScore;
        var input = document.querySelector('.final-score').value;

        if (input) {
            winScore = input;
        } else {
            winScore = 100;
        }

        // Check if player won the game

        if (scores[activePlayer] >= winScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;

        } else {
            // Next Player
            nextPlayer();
        }
    }
});



document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    

    document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    // Hide the dice in beginning
    document.querySelector('.dice').style.display = 'none';

    //setting up all scores to zero
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Initialization

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

}





