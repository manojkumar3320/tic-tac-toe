class game{

    constructor(){

    } 

    drawBoard(){ // method used to draw the gaming board
        this.userWon = false; // variable to check whether user has won or not
        this.playerSymbol = "X"; // playerSymbol declared
        this.winningCombination = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]; // winning combinations array
        this.computerChoices = [0,1,2,3,4,5,6,7,8]; // computer choices array
        this.movesPlayed = 0; // to check how many moves has been played
        DOM_ELEMENTS.gameBoard.innerHTML = "";  
        var table = document.createElement("table"); // create a table
        DOM_ELEMENTS.gameBoard.appendChild(table); // append to gameboard
        var tableInner = `<tr><td onclick="GAME.checkMove(this)"></td><td onclick="GAME.checkMove(this)"></td><td onclick="GAME.checkMove(this)"></td></tr>`; // adding tr and td to the table
        console.log(tableInner);
        for(var i=0;i<3;i++){ // we need three rows and three columns hence for loop
            table.innerHTML += tableInner; // create three rows and three columns
        }
        console.log(table);
    }

    checkMove(currenttd){ // method to check the move played by the player
        if(this.playerSymbol == "X"){
            this.playerMove(currenttd); // if the player symbol is X , call playermove
        }
    }

    playerMove(currenttd){ // method to play by the player
        currenttd.innerHTML = "X"; // currenttd will be drawn X
        this.movesPlayed += 1; // moves played is incremented by 1
        currenttd.setAttribute('value',"X"); // currentd value is set to X
        var currenttdid = currenttd.getAttribute('id'); // get the currenttd id
        for (var i = 0; i < this.computerChoices.length; i++){ // for loop to remove the number in computerchoices array which is drawn by the player
            if (this.computerChoices[i] == currenttdid) { // to check if the currenttdid is equal to computerchoice value
                this.computerChoices.splice(i, 1); // if true , delete that value from computerchoices array , one at a time
                break; // break the stmt
            }
        }
        console.log('Check');
        this.checkWinner("X"); // method called to check winner by passing X to it
        if(this.userWon == false){ // if the player looses
            this.computerMove(); // call computermove method
        }
    }

    computerMove(){ // method to make the computer paly
        var rand = this.computerChoices[Math.floor(Math.random() * this.computerChoices.length)]; // select the random number from computerchoices array
        this.movesPlayed += 1; // movesplayed is incremented by 1
        var getTd = document.querySelector(`td[id="`+rand+`"]`); // get the td with the id set to random number selected
        getTd.innerHTML = "O"; // gettd will be drwn O
        getTd.setAttribute('value',"O"); // set the value of the gettd to O
        //repeating the above player move to computer move
        var currenttdid = getTd.getAttribute('id');
        for (var i = 0; i < this.computerChoices.length; i++){
            if (this.computerChoices[i] == currenttdid) { 
                this.computerChoices.splice(i, 1);
                break;
            }
        }    
        this.checkWinner("O"); // calling checkwinner by passing O
    }

    checkWinner(currentsymbol) { // method to check the winner by passing the current symbol
        this.winningCombination.forEach(singleCombination => { // for each of the winning combination array check the below conditions
            if(
                (DOM_ELEMENTS.block[singleCombination[0]].getAttribute('value') != "undefined") && (DOM_ELEMENTS.block[singleCombination[0]].getAttribute('value') != "null") &&
                (DOM_ELEMENTS.block[singleCombination[1]].getAttribute('value') != "undefined") && (DOM_ELEMENTS.block[singleCombination[1]].getAttribute('value') != "null") &&
                (DOM_ELEMENTS.block[singleCombination[2]].getAttribute('value') != "undefined") && (DOM_ELEMENTS.block[singleCombination[2]].getAttribute('value') != "null") &&    
                (DOM_ELEMENTS.block[singleCombination[0]].getAttribute('value') === DOM_ELEMENTS.block[singleCombination[1]].getAttribute('value')) && 
                (DOM_ELEMENTS.block[singleCombination[1]].getAttribute('value') === DOM_ELEMENTS.block[singleCombination[2]].getAttribute('value'))
            ) {
                this.userWon = true; // if the above conditions are true , set the userwon to true
                console.log(this.userWon);
                alert(currentsymbol+" wins!"); // alert the current symbol wins . if X or O
                this.resetGame(); // reset the game method is called
            }
        });
        if(this.userWon == false && this.movesPlayed === 9){ // condition to check if the userwon is false and the number of moves played is equal to 9
            alert("Draw!"); // alert draw
            this.resetGame(); // call the method to reset the game
        }    
    }

    resetGame(){ // method to reset the game
        DOM_ELEMENTS.resetGameContainer.style.display = 'block'; // display the reset game container
    }
}

const GAME = new game(); // object of game
GAME.drawBoard(); // call the method drawboard
DOM_ELEMENTS.indexTd();