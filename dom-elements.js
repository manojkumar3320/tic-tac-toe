class domelements{
    constructor(){
        this.resetGameContainer = document.querySelector('.reset-game'); // reset gamecontainer 
        this.gameBoard = document.querySelector('#game-board'); // game board
        this.resetBtn = document.querySelector('.reset-game a'); // reset button
        this.resetBtn.addEventListener("click",function(e){ // click function on reset button
            e.preventDefault(); // prevent default
            GAME.drawBoard(); // draw function is callled
            this.indexTd(); // calling indexTd
            this.resetGameContainer.style.display = 'none'; // reset game container is not displayed
        });
    }    
    indexTd(){
        this.block = document.querySelectorAll('td'); // query selector for all the td
        this.block.forEach(function (element, i) { // for each block
            element.setAttribute('id',i); // set the attribute id to each td
            element.setAttribute('value',null); // set the value of the td to null
        });
    }    
}

const DOM_ELEMENTS = new domelements();
