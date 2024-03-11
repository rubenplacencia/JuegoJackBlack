

let deck = [];
let tipos = ['C','D','H','S'];
let especiales = ['A','J','Q','K'];
let puntosJugadores = [];

//REFERENCIAS HTML

let btnPedir = document.querySelector('#btnPedir')
const puntosHTML = document.querySelectorAll('small');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevoJuego');
const divCartasJugadores = document.querySelectorAll('.divCartas')

const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = [];
    for(let i = 0; i < numJugadores; i++){
        puntosJugadores.push(0)
    }
        puntosHTML.forEach( elem => elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled   = false;
        btnDetener.disabled = false;

};

//ESTA FUNCION CREA UNA NUEVA BARAJA
const crearDeck = () => {
     deck = []
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
   
    
    return _.shuffle(deck);
}


//FUNCION QUE PERMITE PEDIR NUEVA CARTA

const pedirCarta = () => {
    if(deck.length == 0){ 
        throw 'Ya no hay mas cartas en el deck'
    }
    const carta = deck.pop();
    console.log(carta);
     return carta;
}



const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length -1);
     let puntos = (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1
     return(puntos);
}

const acumularPuntosJugador = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
}

const crearCarta = (carta, turno ) => {
         const imgCarta = document.createElement('img');
         imgCarta.src = `/../assets/cartas-220623-173702/cartas/${carta}.png`
         imgCarta.className = 'carta'
         divCartasJugadores[turno].append(imgCarta)
}

const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
     do {
        const carta = pedirCarta();
        crearCarta(carta, puntosJugadores.length - 1)
        puntosComputadora = acumularPuntosJugador(carta, puntosJugadores.length - 1)
        puntosHTML[1].innerText = puntosComputadora
        if(puntosMinimos > 21 ){
            break;
        }
        
     } while( (puntosComputadora < puntosMinimos) && puntosMinimos <= 21 )

     setTimeout(() => {
     if(puntosComputadora == puntosMinimos){
        alert('NADIE GANA');
     }else if(puntosMinimos > 21){
        alert('computadora gana');
     } else if(puntosComputadora > 21){
        alert('jugador gano');
     } else{
        alert('computadora gana');
     }
     
    }, 20);
}


//EVENTOS/////////////////////////


btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    let puntosJugador = acumularPuntosJugador(carta, 0)
    crearCarta(carta, 0);
   
    if(puntosJugador > 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador == 21){
        console.warn('21, genial')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () =>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugadores[0]);
})

btnNuevo.addEventListener('click', () =>{
    inicializarJuego();
})

//TODO: BORRAR

