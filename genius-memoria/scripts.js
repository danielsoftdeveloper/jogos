let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const green = document.querySelector('.green');

const red  = document.querySelector('.red');

const blue = document.querySelector('.blue');

const yellow = document.querySelector('.yellow');

//cria a ordem aleatória das cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];
    
    for(let i in order) {
        let elementColor = createColorElement(order[i]);

        console.log(elementColor);

        lightColor(elementColor, Number(i) + 1);

    }
}

//acende a próxima cor
let lightColor = (element, number) => {
    number = number * 1000;
    setTimeout(() => {
        element.classList.add('selected');
        
    }, number - 100);
    setTimeout(() => {
        element.classList.remove('selected');
    });
}

//checa se os botoes clicados são os mesmos da ordem gerada.
let checkOrder = () => {
    for(let i in clickedOrder){        

        if(clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
        if(clickedOrder.length == order.length){
            alert(`Pontuação: ${score}\nVocê acertou! Iniciando proximo nível!`);
            nextLevel();
        }

    }
}

// função para o clique do usúario.
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
       createColorElement(color).classList.remove('selected'); 
       
       checkOrder();    
    }, 250);
    
}

//criar a função que retorna a cor
let createColorElement = (color) => {
    if(color == 0){
        return green;
    } else if(color == 1){
        return red;;
    } else if (color == 2){
        return yellow;
    } else if(color == 3){
        return blue;
    }
}


// função para próximo nível do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//função para game over
let gameOver = () => {
    alert(`Pontuação:: ${score}!\nVocê perdeu o jogo!\n Clique em ok para iniciar um novo jogo`);
    //order = [];
    //clickedOrder = [];

    //playGame(); // jogar novamente
}

// função do iniciar do jogo
let playGame = () => {
    alert('Benvido ao Genius virtual! Iniciando jogo');
    score = 0;
    nextLevel();
}
// eventos de clicks par as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

// incio do jogo
playGame();