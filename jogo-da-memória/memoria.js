/* imagens da cartas do jogo da memória. */
let imagens = [];
for (let i = 1; i <= 8; i++) imagens.push(`https://picsum.photos/id/${i}/100`);
let fundo = "https://picsum.photos/100?grayscale";

let cliquesTravados = false;
let temCartaVirada = false;
let posicaoCartaVirada = -1;
let valorCartaVirada = 0;
let pontos = 0;
const timerDoJogo = new Timer("#timer");

// Estado do jogo
let cartas = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

onload = () => {
  /* carrega as imagens de fundo */
  let elemeImagens = document.querySelectorAll("#memoria img");
  elemeImagens.forEach((img, i) => {
    img.src = fundo;
    img.setAttribute("data-valor", i);
    img.style.opacity = 0.4;
  });

  /* Cria o evento inicia o jogo ao clicar no botão Iniciar */
  document.querySelector("#btInicio").onclick = iniciaJogo;
};

// ====================================
// Inicia o Jogo da memoria.
// ====================================

const iniciaJogo = () => {
  // Primeiro embaralhar as cartas
  for (let i = 0; i < cartas.length; i++) {
    let p = Math.trunc(Math.random() * cartas.length);
    let aux = cartas[p];
    cartas[p] = cartas[i];
    cartas[i] = aux;
  }
  /* console.log("vetor Cartas Embaralhadas", cartas); */

  // associar evento as imagens
  let elemeImagens = document.querySelectorAll("#memoria img");
  elemeImagens.forEach((img, i) => {
    img.onclick = trataCliqueImagem;
    img.style.opacity = 1;
    img.src = fundo;
  });

  // Reinicia o estado do iniciaJogo;
  cliquesTravados = false;
  temCartaVirada = false;
  posicaoCartaVirada = -1;
  valorCartaVirada = 0;
  pontos = 0;

  // desabilita o botão iniciar quando começa o jogo.
  document.querySelector("#btInicio").disabled = true;
  document.querySelector("#timer").style.backgroundColor = "orange";
  timerDoJogo.start(); // dispara o timer.
};

// ====================================
// Processa a imagem
// ====================================
const trataCliqueImagem = (e) => {
  if (cliquesTravados) return;
  // + muda string na number.
  const p = +e.target.getAttribute("data-valor");
  const valor = cartas[p]; //16 cartas
  e.target.src = imagens[valor - 1];
  e.target.onclick = null;

  if (!temCartaVirada) {
    // não tem carta viradas
    temCartaVirada = true;
    posicaoCartaVirada = p;
    valorCartaVirada = valor;
  } else {
    // tem carta virada.
    if (valor == valorCartaVirada) {
      pontos++; // acertou as duas cartas
    } else {
      const p0 = posicaoCartaVirada;
      cliquesTravados = true;
      setTimeout(() => {
        e.target.src = fundo;
        e.target.onclick = trataCliqueImagem;
        let img = document.querySelector("#memoria #i" + p0); // para vir segunda carta
        img.src = fundo;
        img.onclick = trataCliqueImagem;
        cliquesTravados = false;
      }, 1500);
    }

    //continua jogo
    temCartaVirada = false;
    posicaoCartaVirada = -1;
    valorCartaVirada = 0;
  }

  /*  if (temCartaVirada) {
    cliquesTravados = true;
  } */
  /* console.log("Total", pontos); */
  if (pontos > 7) {
    document.querySelector("#btInicio").disabled = false;
    alert("Parabéns, voce conseguiu!");
    document.querySelector("#timer").style.backgroundColor = "lightgreen";
    timerDoJogo.stop(); // para o tempo
  }
};

// ====================================
// Timer
// ====================================
function Timer(e) {
  this.element = e;
  this.time = 0;
  this.control = null;
  this.start = () => {
    this.time = 0;
    this.control = setInterval(() => {
      this.time++;
      const minutes = Math.trunc(this.time / 60);
      const seconds = this.time % 60;
      //apresenta time.
      document.querySelector(this.element).innerHTML =
        (minutes < 10 ? "0" : "") +
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds;
    }, 1000);
  };
  this.stop = () => {
    clearInterval(this.control);
    this.control = null;
  };
}
