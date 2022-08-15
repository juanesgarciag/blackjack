const moduloBlackJack = (() => {
    'use strict'
    
    let deck = [];
    const types = ['C', 'D', 'H', 'S' ],
        specials = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    const d = document;

    // Referencias HTML
    const btnPedir = d.querySelector('#btnPedir'),
        btnDetener = d.querySelector('#btnDetener'),
        btnNuevo = d.querySelector('#btnNuevo'),
        smalls = d.querySelectorAll('small'),
        divCartasJugadores = d.querySelectorAll('.divCartas');
        // jugCartas = d.querySelector('#jugador-cartas'),
        // compCartas = d.querySelector('#computadora-cartas');


    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];

        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        smalls.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerText = '');

        btnPedir.disabled= false;
        btnDetener.disabled = false;
    }

    //Crea la baraja
    const crearDeck = () => {

        deck = [];

        for(let i = 2; i <= 10; i++){
            for(let type of types){
                deck.push(i + type)
            }
        }

        for(let special of specials){
            for(let type of types ){
                deck.push(special + type)
            }
        }

        return deck = _.shuffle(deck);
    }

    const pedirCarta = () =>{

        if(deck.length === 0){
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length -1);

        let puntos = 0;

        return puntos = (isNaN(valor)) ? 
                    (valor === 'A') ? 11 : 10
                    : valor * 1;
    }

    const acumPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        smalls[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {

        const imgCarta = d.createElement('img');
        
        imgCarta.src = `./assets/cartas/${carta}.png`;
        imgCarta.className = 'carta';
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinaGanador = () => {

        const [puntosMinimos, puntosComput] = puntosJugadores;

        setTimeout(() => {
            if(puntosComput === puntosMinimos){
                alert('Nadie gana, es un empate.');
            }else if (puntosMinimos > 21){
                alert('Computadora gana :/');
            }else if (puntosComput > 21){
                alert('¡Felicitaciones, has ganado!');
            }else{
                alert('Computadora gana :/');
            }
            
        }, 1000);
    }

    // Turno computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComput = 0;
        
        do {
            const carta = pedirCarta();
        
            crearCarta(carta, puntosJugadores.length - 1)

            puntosComput = acumPuntos(carta, puntosJugadores.length - 1);

            if(puntosMinimos > 21){
                break;
            }
            
        } while (( puntosComput < puntosMinimos) && (puntosMinimos <= 21));

        determinaGanador();

    }

    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        const puntosJugador = acumPuntos(carta, 0)

        crearCarta(carta, 0)

        if(puntosJugador > 21){
            console.warn('Haj perdio');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }else if (puntosJugador === 21){
            console.warn("21, BlackJack!");
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    }) 

    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    })

    // btnNuevo.addEventListener('click', () => {
    //     // deck = crearDeck();
    //     inicializarJuego();
    // });

    return {
        nuevoJuego: inicializarJuego
    };

})();