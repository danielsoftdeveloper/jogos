/* imagens da cartas do jogo da memória. */
let imagens = [];
for (let i = 1; i <= 8; i++) imagens.push(`https://picsum.photos/id/${i}/100`);
let fundo = "https://picsum.photos/100?grayscale";

// Estado do jogo
let cartas = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

onload = () => {
    /* carrega as imagens de fundo */
  let elementosImagens = document.querySelectorAll("#memoria img");
  elementosImagens.forEach((img, i) =>{
      img.src =fundo;
      img.setAttribute('data-valor', i);
      img.style.opacity = 0.5;
  });

  /* Cria o evento do botão de Inicio */
  document.querySelector('#bt-inicio').onclik = iniciaJogo;

};

  // ====================================
  // Inicia o Jogo da memoria.
  // ====================================

  const iniciaJogo = () =>{

    // Primeiro embaralhar as cartas
    for(let i = 0; i < cartas.length; i++){
        let p = Math.trunc( Math.random() * cartas.length);
        let aux = cartas[p];
        cartas[p] = cartas[i];
        cartas[i] = aux;
    }
    console.log(cartas);

  }