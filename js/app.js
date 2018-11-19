//node list of all cards
const cardList = document.querySelectorAll('.card');
//store the nodelist into an array
let grid = [...cardList];
//store deck parent to append shuffle items
const deck = document.getElementById("card-deck");
//store move element
const movesCount = document.querySelector('.moves');
//store stars element
const starsList = document.querySelectorAll(".fa-star");
// array for opened cards
 let openedCards= [];
let timer = document.getElementsByClassName('timer')[0];
//timer variables
let seconds = 0, minutes = 0, hours = 0, t;
//variable to store matched cards
let matchCounter=0;
//variable to store no of total moves
let moves=0;


// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
//get the modal
const modal = document.getElementById('myModal');
//get the pop element to show details
const popMoves = document.querySelector('.pop-moves');
const popStars = document.querySelector('.pop-stars');
const popTime = document.querySelector('.pop-time');
const playAgainBtn = document.querySelector('.play-again');
//get star elements into array
let starList = Array.from(document.querySelector('.stars'));


//load the game grid on loading the page
document.body.onload = makeGameGrid();


function makeGameGrid(){
	//call shuffle function
	grid = shuffle(grid);
	let tempArray= [];
	//append new shuffled items to the dock
	for (var i = 0; i < grid.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(grid, function (item) {
            deck.appendChild(item);
        });
        grid[i].classList.remove("show", "open", "match", "disabled");
    } 
    //display all stars initially
   	 for(let i = 0; i < starsList.length; i++){
   	 	starsList[i].style.visibility = 'visible';
   	 	starsList[i].style.color = '#f1f709';
   	 }
   	 //reset the variables
   	 seconds= 0;
   	 minutes=0;
   	 hours=0;
   	 moves=0;
   	 matchCounter=0;
   	 movesCount.innerHTML = moves;
   	 openedCards= [];
   	 let playerStars=3;
   }

	// Shuffle function from http://stackoverflow.com/a/2450976
	function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    	}

    return array;
	}


   	function openCard(){
   		this.classList.toggle("open");
   		this.classList.toggle("show");
    	this.classList.toggle("disabled");
    	openedCards.push(this);
    	timerStart();    	
    	 let matchList=0;
    	 let noOfCards = openedCards.length;
	    	 if(noOfCards === 2){
	    	 	movesCounter();
	    	 	//check cards for similarity
	    	 	 if(openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className){
	           		matched(openedCards);
	       			openedCards = [];   
		 	 		}
	    	 		else {
	    	 			unMatched(openedCards);
	    	 		}
	   			}
	   			//end game when all 8 cards are matched
	   			 if(matchCounter===2){
    	 			endGame();
    	 		}
    }
    //listen to events for click 
   for(let i=0; i <grid.length; i++){
   let cardStack= grid[i];
    cardStack.addEventListener('click', openCard);
	}
	//nothing function to make another functon execute only once
	function noop(){};
	function timerStart(){
		timerStart=noop;
		setTimer();
	}

	function movesCounter(){
		moves++;
		movesCount.innerHTML = moves;
		setStars(moves);
	}

	function setStars(moves){
		if(moves > 30 && moves <45){
			starsList[2].style.visibility='hidden';
		}
		else if(moves >= 45){
			starsList[1].style.visibility='hidden';
		}
	}
	//implementation of timers
	function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    timer.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    setTimer();
	}

	function setTimer() {
    t = setTimeout(add, 1000);
        timer.innerHTML = `${hours} h ${minutes} m ${seconds} s `;
	}

	//enters when two cards are matched
    function matched(cards){
    	matchCounter++;
    	for (let i = 0; i < 2; i++){
             cards[i].classList.add('match');
             cards[i].classList.remove('show', 'open');
        }
	}
	//enter when two cards are unmatched
    function unMatched(cards){
    	for (let i = 0; i < 2; i++){
             cards[i].classList.add('unmatched');
       }
       //restore the card and flip back after 300ms
       setTimeout(restoreCard, 300);
    }
    //when all cards are matched, open popup
    function endGame(){	
		    modal.style.display = "block";
		    popMoves.innerHTML = moves;
		    popStars.innerHTML = starsList.length;
		   popTime.innerHTML = timer.innerHTML;
		// When the user clicks on <span> (x), close the popup
		span.onclick = function() {
		    modal.style.display = "none";
		    makeGameGrid();
		}
		playAgainBtn.onclick = function() {
		    modal.style.display = "none";
		    makeGameGrid();
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		    if (event.target === modal) {
		        modal.style.display = "none";
		    }
		}
    }

    function restoreCard(cards){
    for(let i = 0; i < 2; i++){
            openedCards[i].classList.remove('open', 'show', 'unmatched', 'disabled');
        }
        openedCards = [];   
    }
