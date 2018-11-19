/*
 * Create a list that holds all of your cards
 */
const cardList = document.querySelectorAll('.card');

let grid = [...cardList];

//const deck = document.getElementbyClass(".card");

let movesCount = document.querySelector('.moves');

const starsList = document.querySelectorAll(".fa-star");

let timer = document.getElementsByClassName('timer')[0];

let seconds = 0, minutes = 0, hours = 0, t;

let matchCounter=0;

let moves=0;


// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let modal = document.getElementById('myModal');

let popMoves = document.querySelector('.pop-moves');

let popStars = document.querySelector('.pop-stars');

let popTime = document.getElementsByClassName('pop-time');

let starList = Array.from(document.querySelector('.stars'));
console.log(starsList+"dfvd");
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

document.body.onload = makeGameGrid();
function makeGameGrid(){
	grid = shuffle(grid);
	 console.log(grid);
	let tempArray= [];
	tempArray.forEach.call(grid, function(item){
   		 });
    for (let i = 0; i < grid.length; i++) {
        grid[i].classList.remove( 'open', 'show', 'match', 'unmatched', 'disabled');
   	 }

   	 for(let i = 0; i < starsList.length; i++){
   	 	starsList[i].style.visibility = 'visible';
   	 	starsList[i].style.color = '#f1f709';
   	 }

   	 seconds= 0;
   	 minutes=0;
   	 hours=0;
   	 moves=0;
   	 matchCounter=0;
   	 movesCount.innerHTML = moves;

   }

   // openCards();
   let openedCards= [];
   let openCard = function(){
   		this.classList.toggle("open");
   		this.classList.toggle("show");
    	this.classList.toggle("disabled");
    	openedCards.push(this);
    	timerStart();    	
    	 let matchList=0;
    	 let noOfCards = openedCards.length;
    	 console.log(matchCounter);
	    	 if(noOfCards === 2){
	    	 	movesCounter();
	    	 	 if(openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className){
	           		matched(openedCards);
	       			openedCards = [];   
		 	 		}
	    	 		else {
	    	 			unMatched(openedCards);
	    	 		}
	   			}
	   			 if(matchCounter===2){
    	 			endGame();
    	 			}
    		}

   for(let i=0; i <grid.length; i++){
   let cardStack= grid[i];
    cardStack.addEventListener('click', openCard);
	}

	function noop(){};
	function timerStart(){
		timerStart=noop;
		setTimer();
	}
	function movesCounter(){
		moves++;
		movesCount = moves;
		setStars(moves);
	}

	function setStars(moves){
		if(moves > 10 && moves <20){
			starsList[2].style.visibility='hidden';
		}
		else if(moves >= 20){
			starsList[1].style.visibility='hidden';
		}
	}
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
    
    timer.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    setTimer();
	}

	function setTimer() {
    t = setTimeout(add, 1000);
        timer.innerHTML = hours + ' h ' + minutes + ' m ' + seconds + ' s ';
	}


    function matched(cards){
    	matchCounter++;
    	for (let i = 0; i < 2; i++){
             cards[i].classList.add('match');
             cards[i].classList.remove('show', 'open');
        }
	}

    function unMatched(cards){
    	for (let i = 0; i < 2; i++){
             cards[i].classList.add('unmatched');
       }
       setTimeout(restoreCard, 500);
    }
    function endGame(){	
		    modal.style.display = "block";
		    popMoves.innerHTML = moves;
		    popStars.innerHTML = starsList.length;
		   popTime.innerHTML = timer.innerHTML;
		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
