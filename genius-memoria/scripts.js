let order = [];
let clickedOrder = [];
let score = 0;
var continuar = new Boolean(false);

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
    order = [];
          
    let elementColor;

    let colorOrder = Math.floor(Math.random() * 4);

    order[order.length] = colorOrder;
        
    for(let  i in order) {
        //console.log("i: " + i);

       elementColor = createColorElement(order[i]);

       lightColor(elementColor, Number(i));

      console.log("vetor order inicial: " + order);
    
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
           
       }, 400); // apos tempo remove luz. 
        
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
    x.play();
    shuffleOrder();        
    
}

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

    let i = 0;

    while( i < order.length){        

        let pegaUmDaOrdem = order[i];
        console.log("DaOrdem: "+ pegaUmDaOrdem);
            
        let pegaUmDoClique = clickedOrder[i];

        console.log("DoClick: "+ pegaUmDoClique);

        //console.log(clickedOrder);

        if(pegaUmDaOrdem == pegaUmDoClique) {

            console.log("acertou!");
            break;
            continuar = true;                                     
            
        }  

        if(pegaUmDaOrdem != pegaUmDoClique) {
       
            alert("Pontuação do Jogo: " + score);
            document.getElementById("btn").innerText = "Errou jogar novamente";             
            document.getElementById("btn").style.display = "block";
            document.getElementById("btn").style.background = "red";
            i = 100; 
            continuar = false;
            return;                             
             
        }  

        i++;

    }       
    
    if(continuar){
        setTimeout(() => {
           
            x.play();            
            nextLevel();
        
            
        }, 5000);     
       
    }    
    
    order = [];

}


//função para game over
let gameOver = () => {
    alert(`Pontuação:: ${score}!\nVocê perdeu o jogo!`);   
    order = [];
    clickedOrder = [];
}

function functionPlayGame() {
    
    playGame();
    escondeButton();

} 

function escondeButton(){

    document.getElementById("btn").style.display = "none";
       
} 

