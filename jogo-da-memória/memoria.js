/* imagens da cartas do jogo da memória. */
let imagens = [];
for (let i = 1; i <= 8; i++) imagens.push(`https://picsum.photos/id/${i}/100`);
let fundo = "https://picsum.photos/100?grayscale";

onload = () => {
  let elementosImagens = document.querySelectorAll("#memoria img");
  elementosImagens.forEach((img, i) =>{
      img.src =fundo;
      img.setAttribute('data-valor', i);
      img.style.opacity = 0.5;
  });
};
