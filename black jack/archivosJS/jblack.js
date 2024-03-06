let deck = [];
let tipos = ['C','D','H','S'];
let especiales = ['A','J','Q','K'];

//REFERENCIAS HTML

let btnPedir




//ESTA FUNCION CREA UNA NUEVA BARAJA
const crearDeck = () => {
    for(let i = 2; i <= 10; i++ ){
        for(let tipo of tipos){ 
            deck.push(i + tipo);
        }
    }
        for(let tipo of tipos){
            for(let especial of especiales){ 
                deck.push(especial + tipo);
            }
        }
   
    deck = _.shuffle(deck);
    return deck;
}

crearDeck();


//FUNCION QUE PERMITE PEDIR NUEVA CARTA

const pedirCarta = () => {
    if(deck.length == 0){ 
        throw 'Ya no hay mas cartas en el deck'
    }
    const carta = deck.pop();

     return carta;
}

pedirCarta();

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length -1);
     puntos = (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1
     return(puntos);
}


valorCarta(pedirCarta());


