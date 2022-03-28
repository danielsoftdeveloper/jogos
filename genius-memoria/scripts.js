let order = [];
let clickedOrder = [];
let newArray = [];
let TAM = 1;
let score = 0;
var continuar = new Boolean(false);
var x = document.getElementById("myAudio");

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

//adiciona a class do CSS na constante
const green = document.querySelector('.green');

const red = document.querySelector('.red');

const blue = document.querySelector('.blue');

const yellow = document.querySelector('.yellow');

// eventos de clicks par as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// função para o clique do usúario.
let click = (color) => {

    clickedOrder = [];
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');

        checkOrder();
    }, 250);

}

//cria a ordem aleatória das cores
let shuffleOrder = () => {

    repeatDraw();

}

// criar repetição da sequência
let repeatDraw = () => {

    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    newArray = order;

    rodaCores();
}

let rodaCores = () => {

    for (let y in order) {

        elementColor = createColorElement(newArray[y]);
        lightColor(elementColor, Number(y));
       
    }

}

//criar a função que retorna a cor
let createColorElement = (color) => {

    if (color == 0) {

        return green;

    } else if (color == 1) {

        return red;

    } else if (color == 2) {

        return yellow;

    } else if (color == 3) {

        return blue;
    }

}

//acende a próxima cor
let lightColor = (element, number) => {

    number = number * 1000;

    setTimeout(() => {
        element.classList.add('selected');

        setTimeout(() => {
            element.classList.remove('selected');

        }, 400); // apos tempo remove luz. 

    }, number - 100);

}

//checa se os botoes clicados são os mesmos da ordem gerada.
let checkOrder = () => {
    let i = 0;

    do {
        let pegaClique = clickedOrder[i];
        let ordem = order[i];

        if (ordem != pegaClique) {
            continuar = false;
            i = 100;
            return;
        } 
        else {
            functionScore();
            document.querySelector('.badge').innerText = score;
            continuar = true;
            break;
        }

    } while (i < order.length);
    
    clickedOrder = [];

    if (score < 5) {
        functionNextLevel();
    }
    else {
        document.getElementById("btnLevel").style.display = "block"; document.getElementById("btnLevel").style.display = "block";
    }

    if (continuar == false) {
        myStopFunction();
        alert(`Perdeu clicou na sequencia errada!`);        

    }

    if (continuar) {
        TAM++;
    }

}

// função para próximo nível do jogo
function functionPlayGame() {
    playGame();
    escondeButton();   
}

let functionScore = () => {
    score++;
}

// função do iniciar do jogo
let playGame = () => {
    x.play();
    shuffleOrder();
}

let RepetirRodadaGame = () => {
    order = [];
    newArray = [];
    x.play();
    shuffleOrder();
}

//função para game over
let gameOver = () => {
    alert(`Você perdeu clicou na sequencia errada!`);
}

function playAudio() {
    x.play();
}

function escondeButton() {
    document.getElementById("btn").style.display = "none";
}

const myTimeout = functionNextLevel = () => {
    setTimeout(() => {
        if (click) {
            playGame();
            playAudio();
        }
    }, 3500);

}

//para sorteio
function myStopFunction() {
    clearTimeout(myTimeout);
}
