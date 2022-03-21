var order = [];
var clickedOrder = [];
let score = 0;
var go = 1;

var x = document.getElementById("myAudio");

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

    let elementColor;

    let colorOrder = Math.floor(Math.random() * 4);

    order[order.length] = colorOrder;
        
    for(let  i in order) {

       elementColor = createColorElement(order[i]);

       lightColor(elementColor, Number(i) + 1);

     console.log(" vetor order inicial: " + order);
    
    }

}

//criar a função que retorna a cor
let createColorElement = (color) => {    

    if(color == 0){

        return green;

    } else if(color == 1){

        return red;

    } else if (color == 2){

        return yellow;

    } else if(color == 3){

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

           
       }, 250); // apos tempo remove luz. 
        
    }, number - 100);
    
}

// função para próximo nível do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}


// função do iniciar do jogo
let playGame = () => {
    score = 0;
    alert('Benvido ao Genius virtual! Iniciando jogo "\n" Clique na sequencia de cores após parar de piscar');
    x.play();
    shuffleOrder();        
    
}

// função para o clique do usúario.
let click = (color) => {
    //console.log(color);
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
       createColorElement(color).classList.remove('selected'); 
       
       checkOrder();    
    }, 250);
    
}

// eventos de clicks par as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

function playAudio() { 
    x.play(); 
  } 

//checa se os botoes clicados são os mesmos da ordem gerada.
let checkOrder = () => {

    for(let i in clickedOrder) {

        console.log("entrou no for Order: " + order[i]);
        console.log("entrou noo for click: "+ clickedOrder[i]);

        if(clickedOrder[i] != order[i]) {

            console.log("entrou no for Order: " + order[i]);
            console.log("entrou noo for click: "+ clickedOrder[i]);
            gameOver();
            go = 0;
            return;
            
        }
    }

   console.log(order);

   if(clickedOrder.length == order.length) {
    //alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
    console.log("acertou!")
    go = 1;
     
    } 

    if(go == 1){
        setTimeout(() => {

            if(go){
            x.play();
            
            nextLevel();
            }
            
        }, 5000);     
       
    }        

}


//função para game over
let gameOver = () => {
    alert(`Pontuação:: ${score}!\nVocê perdeu o jogo!\n Clique em ok para iniciar um novo jogo`);
   
    order = [];
    clickedOrder = [];
}

playGame();
