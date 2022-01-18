class Deck {
    constructor() {
    this.deck = [];
    this.reset(); //Agrega 52 cartas al mazo
    this.shuffle(); //Mezcla el mazo
  } 
  
  reset() {
    this.deck = [];
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

    for (let suit in suits) {
      for (let value in values) {
        this.deck.push(values[value] + " of " + suits[suit]);
      }
    }
  }
   
  shuffle() {
    let numberOfCards = this.deck.length;  
    for (var i=0; i<numberOfCards; i++) {
      let j = Math.floor(Math.random() * numberOfCards);
      let tmp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = tmp;
    }
  }
  
  deal(){
    return this.deck.pop();
  }
  
  isEmpty() {
    return (this.deck.length==0);
  }
  
  length() {
    return this.deck.length;
  }
  
}

class Card {
  constructor(card) {
      this.card = card;
      const cardValues = {"Ace of Hearts":1, "2 of Hearts":2, "3 of Hearts":3, "4 of Hearts":4, "5 of Hearts":5, "6 of Hearts":6, "7 of Hearts":7, "8 of Hearts":8, "9 of Hearts":9, "10 of Hearts":10, "Jack of Hearts":11, "Queen of Hearts":12, "King of Hearts":13, "Ace of Diamonds":1, "2 of Diamonds":2, "3 of Diamonds":3, "4 of Diamonds":4, "5 of Diamonds":5, "6 of Diamonds":6, "7 of Diamonds":7, "8 of Diamonds":8, "9 of Diamonds":9, "10 of Diamonds":10, "Jack of Diamonds":11, "Queen of Diamonds":12, "King of Diamonds":13, "Ace of Clubs":1, "2 of Clubs":2, "3 of Clubs":3, "4 of Clubs":4, "5 of Clubs":5, "6 of Clubs":6, "7 of Clubs":7, "8 of Clubs":8, "9 of Clubs":9, "10 of Clubs":10, "Jack of Clubs":11, "Queen of Clubs":12, "King of Clubs":13, "Ace of Spades":1, "2 of Spades":2, "3 of Spades":3, "4 of Spades":4, "5 of Spades":5, "6 of Spades":6, "7 of Spades":7, "8 of Spades":8, "9 of Spades":9, "10 of Spades":10, "Jack of Spades":11, "Queen of Spades":12, "King of Spades":13};
    
    this.value = cardValues[card];
    this.suit = card.substring(card.indexOf(" of ")+4);
    this.placeHolder = null;
    this.flipped = false;
  
    var suits = {'Hearts':0, 'Diamonds':13, 'Clubs':26, 'Spades':39 }
    this.position = suits[this.suit] + this.value; //Position in a sorted deck
  } //End of Constructor
  
  displayCard(placeHolder,flipped=true) {
    this.placeHolder = document.getElementById(placeHolder);
    this.placeHolder.classList.add("card");
    this.flipped=flipped;
    if (flipped) {
      this.placeHolder.style.backgroundPosition = -150*this.position + "px";
    } else {
      this.placeHolder.style.backgroundPosition = "0px";  
    }
  } // End of displayCard
  
  flip() {
    if (this.flipped) {
      this.placeHolder.style.backgroundPosition = "0px";
      this.flipped=false;
    } else {
      this.placeHolder.style.backgroundPosition = -150*this.position + "px";
      this.flipped=true;  
	  update();
    }
  } //End of flip()
  
} //End of Card class

const deck = new Deck();
let card1,card2,card3,card4,card5,playerCard1,playerCard2;

function deal() {
	
	if (deck.length()<7) {
		deck.reset();
		deck.shuffle();
	}
	
  card1 = new Card(deck.deal());
  card2 = new Card(deck.deal());
  card3 = new Card(deck.deal());
  card4 = new Card(deck.deal());
  card5 = new Card(deck.deal());
  playerCard1 = new Card(deck.deal());
  playerCard2 = new Card(deck.deal());
  
	let cartasRestantes = document.getElementById("restantes");
	cartasRestantes.innerHTML = 'Remaining\n' + deck.length();
  
  /* --- Test
  card1 = new Card("3 of Clubs");
  card2 = new Card("5 of Diamonds");
  card3 = new Card("5 of Hearts");
  card4 = new Card("6 of Hearts");
  card5 = new Card("3 of Hearts");
  playerCard1 = new Card("2 of Hearts");
  playerCard2 = new Card("3 of Diamonds");
  --- */

  card1.displayCard("card1",false);  
  card2.displayCard("card2",false);  
  card3.displayCard("card3",false);  
  card4.displayCard("card4",false);  
  card5.displayCard("card5",false);  
  playerCard1.displayCard("playerCard1",true);  
  playerCard2.displayCard("playerCard2",true); 
} 

function nextStep(el) {
	if (!card1.flipped) {
		card1.flip();
		card2.flip();
		card3.flip();
		el.innerHTML="Reveal 4<sup>th</sup> card";
	} else if(!card4.flipped) {
		card4.flip();
		el.innerHTML="Reveal 5<sup>th</sup> card";
	} else if(!card5.flipped) {
		card5.flip();
		el.innerHTML="New Round";
	} else {
		deal();
		el.innerHTML="Reveal first 3 cards.";
	}
} 

function format(num) {
	switch (num) {
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
		case 10:
			return num;
			break;
		case 11:
			return 'Jokers';
			break;
		case 12:
			return 'Queens'
			break;
		case 13:
			return 'Kings';
			break;
		case 14:
			return 'Aces';
			break;
	}
}
		
		

function update() {
	let sevenCards = [playerCard1, playerCard2, card1, card2, card3, card4, card5];
	let flipped = sevenCards.filter(ele => ele.flipped);
	let puntosMasTexto = []
	
	puntosMasTexto.push(masAlta(flipped));
	puntosMasTexto.push(cardsOfAKind(flipped));
	let flushDupla = flush(flipped);
	puntosMasTexto.push(flushDupla);
	flushSuit = flushDupla[1].slice(9);
	puntosMasTexto.push(escalera(flipped, flushSuit));
	
	let puntos_texto = document.getElementById("puntos");
	puntos_texto.innerHTML = puntosMasTexto.sort((a, b) => a[0] - b[0])[puntosMasTexto.length-1][1];
}

function masAlta(arr) {
	let max = 0;
	let cartaMayor;
	for (carta in arr) {
		if(arr[carta].value == 1) {
			max = 14;
			cartaMayor = arr[carta]
			break;
		} else if(arr[carta].value > max) {
			max = arr[carta].value
			cartaMayor = arr[carta]
		}
	}
	return [100 + max, cartaMayor.card];
}

function cardsOfAKind(arr) {
	let palos = {'Hearts':0, 'Diamonds':0, 'Clubs':0, 'Spades':0 };
	let numeros = [0,0,0,0,0,0,0,0,0,0,0,0,0];
	for (carta in arr) {
		palos[arr[carta].suit]++;
	}
	for (carta in arr) {
		numeros[arr[carta].value-1]++;
	}
	
	/* Pone el contador de Aces al final de la lista */
	numeros.push(numeros[0]);
	numeros.shift(numeros[0]);
	
	if (numeros.lastIndexOf(4)>=0) {
		return [800, "Four of a kind"];
	} else if (numeros.lastIndexOf(3)>=0 && numeros.lastIndexOf(2)>0) {
		return [700, "Full House of \n" + (format(numeros.lastIndexOf(3)+2)) + ' and ' + (format(numeros.lastIndexOf(2)+2))];
	} else if (	numeros.lastIndexOf(3)>=0 ) {
		return [400, "Three of " + (format(numeros.lastIndexOf(3)+2))];
	} else if (	numeros.lastIndexOf(2)>=0 && numeros.lastIndexOf(2) != numeros.indexOf(2)) {
		return [300, "2 pairs of \n" + 
		format((numeros.lastIndexOf(2)+2)) + ' and ' + 
		format((numeros.indexOf(2)+2))];
	} else if ( numeros.lastIndexOf(2)>=0 ) {
		return [200, "Pair of " + format((numeros.lastIndexOf(2)+2))];
	}
		
	return [0, ''];
}

function flush(arr) {
	let auxiliar = {'Hearts':0, 'Diamonds':0, 'Clubs':0, 'Spades':0 };
	arr.forEach( a => auxiliar[a.suit] += 1);
	for(prop in auxiliar) {
		if(auxiliar[prop] >= 5) {
			return [600, 'Flush of ' + prop];
		}
	}	
	return [0, ''];
}

function escalera (arr,flush) {
	let duplas = [];
	
	/* Crea un array de duplas ordenado [numero, primer letra suit] */
	arr.forEach((c) => {
		let arrValues = duplas.map(a => a[0]);
		if (!arrValues.includes(c.value)) {
			duplas.push([c.value , c.suit])
		}else if(c.suit == flush){
			duplas.splice(arrValues.indexOf(c.value), 1);
			duplas.push([c.value , c.suit]);
		}
		duplas.sort( (a,b) => a[0] - b[0] );
	});
	
	function indiceInicialDeEscalera(a,b) {
		let count = 0;
		let primerNum = a[0];
		let indiceInic = b;
		for(let r = b; r<duplas.length; r++) {
			if( duplas[r][0] - primerNum == r - indiceInic) {
				count++;
				if(count==5){
					return b;
				}
			} else if(r>0 && duplas[r][0] == duplas[r-1][0]) {
				indiceInic++;
			} else {
				break;
			}			
		}
		return -1;		
	}

	/* Crea un array con el índice inicial en donde encontró 5 cartas en orden numérico */
	let arrIndex = duplas.map((elem,index) => indiceInicialDeEscalera(elem,index)).sort();
	let indiceMayorEsc = arrIndex[arrIndex.length-1];
	if(indiceMayorEsc >= 0) {
		let arrFinal = duplas.slice(indiceMayorEsc, indiceMayorEsc+5);
		if(arrFinal.every(ele => ele[1] == flush)) {
			return [900, 'Escalera Real de ' + arrFinal[0][0] + ' a ' + arrFinal[4][0]];
		} else {
			return [500, 'Escalera de ' + arrFinal[0][0] + ' a ' + arrFinal[4][0]];
		}
	}
	return [0, ''];
}

deal();

