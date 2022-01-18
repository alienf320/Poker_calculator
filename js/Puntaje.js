function update() {
	let manos = [playerCard1, playerCard2, card1, card2, card3, card4, card5];
	let flipped = manos.filter(ele => ele.flipped);
	let puntos = []
	
	puntos.push(masAlta(flipped));
	/*puntos.push(pair(flipped));*/

	let puntos = document.getElementById("puntos");
	puntos.innerHTML = pair(flipped);	
}

function pair(arr) {
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
	
	if (numeros.lastIndexOf(5)>=0) {
		return "Poker de " + numeros.lastIndexOf(5)+1;
	}else if (numeros.lastIndexOf(4)>=0) {
		return "Four of a kind";
	} else if (numeros.lastIndexOf(3)>=0 && numeros.lastIndexOf(2)>0) {
		return "Full House";
	} else if (	numeros.lastIndexOf(3)>=0 ) {
		return "Pierna de " + (numeros.lastIndexOf(3)+2);
	} else if (	numeros.lastIndexOf(2)>=0 && numeros.lastIndexOf(2) != numeros.indexOf(2)) {
		return "2 Pares de " + 
		format((numeros.lastIndexOf(2)+2)) + ' y ' + 
		format((numeros.indexOf(2)+2));
	} else if ( numeros.lastIndexOf(2)>=0 ) {
		return "Par de " + format((numeros.lastIndexOf(2)+2));
	}
		
	return numeros;
}


function escalera (arr) {
	let duplas = [];
	arr.forEach( i => duplas.push([i.value , i.suit[0]]) );
	duplas.sort( (a,b) => a[0] - b[0] );
	
	function nose(a,b) {
		let count = 0;
		let primerNum = a[0];
		let indiceInic = b;
		/*onsole.log('PrimerNumero: ' + a[0] + '  IndicePriNro: ' + b);*/
		for(let r = b; r<duplas.length; r++) {
			/*console.log("valor duplas[r][0]: " + duplas[r][0]);*/
			/*"console.log("duplas[r][0]: " + duplas[r][0] + " - " + a[0]  + ' r: ' + r + ' - ' + indiceInic);"*/
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
	
