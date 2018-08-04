/*
Game Function:

1) Player must guess a number between a min and max.
2) Player get a certain amount of guesses.  
3) Notify player of guesses remaining.
4) Notify the player of the correct answer if loose
5) Let player choose an play again

*/

//Game Values
var min = 1;
var max = 10;
var winningNum = getRandomNum(min,max);
var guessesLeft = 3;

//UI elements
var game = document.getElementById('game');
var minNum = document.querySelector('.min-num');
var maxNum = document.querySelector('.max-num');
var guessInput = document.getElementById('guess-input');
var guessBtn = document.getElementById('guess-btn');
var message = document.querySelector('.message');


//Assign UI min and max
minNum.textCwinningontent = min;
maxNum.textContent = max;

//Play Again event listner
game.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click',function(){
    var guess = parseInt(guessInput.value);

    //Validate
    if(isNaN(guess) || guess < min || guess > max){
        var msg = 'please enter number between ' + min + ' and ' + max + '.';
        setMessage(msg,'red');
    }

    //Check if won
    if(guess === winningNum){
        //Game Over - won

        //Set message
        var msg = winningNum + ' is correct!, YOU WIN!';

        gameOver(true,msg);
        
    }else{
        //Worng Number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            //Game Over - lost

            //Set message
            var msg = 'GAME OVER!, you lost. the correct number ' + winningNum;
            
            gameOver(false,msg);

        }else{
            //Game continues - answer worng

            //Change border color
            guessInput.style.borderColor = 'red';

            guessInput.value = '';
            //Set message
            //Tell user its worng number 
            var msg = guess + ' is not correct, ' + guessesLeft + ' guesses left.';
            
            setMessage(msg,'red');
        }
    }
});

//Game Over
function gameOver(isWon,msg){
    var color;
    isWon === true ? color = 'green': color = 'red';
    //Disable input
    guessInput.disabled = true;

    //Change border color
    guessInput.style.borderColor = color;
    setMessage(msg,color);

    //Play Again
    guessBtn.value = 'Play Again'
    guessBtn.className += 'play-again';
}

//Get random Number
function getRandomNum(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set message 
function setMessage(msg, colorMsg){
    message.style.color = colorMsg;
    message.textContent = msg;
}