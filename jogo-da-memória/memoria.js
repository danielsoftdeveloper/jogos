/* imagens da cartas do jogo da memória. */
let imagens = [];
for (let i = 1; i <= 8; i++) imagens.push(`https://picsum.photos/id/${i}/100`);
let fundo = "https://picsum.photos/100?grayscale";

// Estado do jogo
let cartas = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let cliquesTravados = false;

onload = () => {
  /* carrega as imagens de fundo */
  let elemeImagens = document.querySelectorAll("#memoria img");
  elemeImagens.forEach((img, i) => {
    img.src = fundo;
    img.setAttribute("data-valor", i);
    img.style.opacity = 0.4;
  });

  /* Cria o evento do botão de Inicio */
  document.querySelector("#btInicio").onclick = iniciaJogo;
};

// ====================================
// Inicia o Jogo da memoria.
// ====================================

const iniciaJogo = () => {
  /* console.log("cartasIniciais", cartas); */

  // Primeiro embaralhar as cartas
  for (let i = 0; i < cartas.length; i++) {
    let p = Math.trunc(Math.random() * cartas.length);
    let aux = cartas[p];
    cartas[p] = cartas[i];
    cartas[i] = aux;
  }
  /*  console.log("cartasEmbaralhadas", cartas); */

  // associar evento as imagens
  let elemeImagens = document.querySelectorAll("#memoria img");
  elemeImagens.forEach((img, i) => {
    img.onclick = trataCliqueImagem;
    img.style.opacity = 1;
    /*  img.src = fundo; */
  });
};

// ====================================
// Processa a imagem
// ====================================

const trataCliqueImagem = (e) => {
  

  // + muda string na number.
  const p = +e.target.getAttribute("data-valor");
  const valor = cartas[p]; //16 cartas
  e.target.src = imagens[valor - 1];
  e.target.onclick = null;

  cliquesTravados = true;


  setTimeout(() => {
    e.target.src = fundo;
    e.target.onclick = trataCliqueImagem;
    cliquesTravados = false;
  }, 2500);
};
