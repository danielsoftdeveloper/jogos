let order = [];
let clickedOrder = [];
let score = 0;
var continuar = new Boolean(false);
let conta = 0;

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
    //console.log(color);
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');

        checkOrder();
    }, 250);

}

//cria a ordem aleatória das cores
let shuffleOrder = () => {

    let elementColor;

    let colorOrder = Math.floor(Math.random() * 4);

    order[order.length] = colorOrder;

    for (let i in order) {
        console.log("i: " + i);

        elementColor = createColorElement(order[i]);

        lightColor(elementColor, Number(i));

        console.log("vetor order inicial: " + order);
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

    console.log("resultado score: " + score);

    let i = 0;

    do {

        console.log("Continuar" + continuar);

        let pegaClique = clickedOrder[i];

        console.log("DoClick: " + pegaClique);

        console.log(clickedOrder[i]);

        if (order[i] === pegaClique) {
            conta++;
            document.querySelector('.badge').innerText = conta;
            console.log("acertou!");
            continuar = true;
            functionScore();
            break;
        }

        if (order[i] != pegaClique) {
            gameOver();
            continuar = false;
            i = 100;
            i++;
            break;
        }

    } while (i < order.length);

    if (continuar) {
        functionNextLevel();
    }

}

// função para próximo nível do jogo
function functionPlayGame() {

    playGame();// 
    escondeButton();
    //continuar = true;
}
let functionScore = () => {
    score++;
}

// função do iniciar do jogo
let playGame = () => {
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

function functionNextLevel() {

    setTimeout(() => {
        playGame();
        playAudio();

    }, 5000);

}

