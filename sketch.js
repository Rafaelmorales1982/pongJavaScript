//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 275;
let tamanhoBolinha = 25; // diâmetro
let xBolinhaVelocidade = 8;
let yBolinhaVelocidade = 3;

//melhorando a colisão da bolinha pois esta pegando no diâmetro
//diâmetro fica no meio da bolinha o raio fica para parte externa
//da bolinha
let raio = tamanhoBolinha / 2; // assim a bolinha vai colidir
//de forma mais correta

//variáveis da raquete
let xRaquete = 8; //posição pouco para direita
let yRaquete = 160; //
let larguraRaquete = 11;
let alturaRaquete = 70;

//raquete oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 160;
let velocidadeYoponente;

let colidiu = false;
//let colidiuOponente = false;

//sons do jogo
let raquetada;
let pontoSomHulk;
let pontoSomAranha;
let fundoSom;

function preload(){
  fundoSom = loadSound('fundo.mp3');
  raquetada = loadSound('raquete.mp3');
  pontoSomAranha = loadSound('homemAranha.mp3');
  pontoSomHulk = loadSound('Hulk.mp3');
}

//imagem de fundo
let image1;
let hulk;
let aranha;
let vs;
let placar;
let tigre;
let professor;
function setup() {
 
  
  //Criando cenário (fundo)-tela
  createCanvas(600, 400); //largura e altura
  image1 = loadImage('escudo.png');// pega imagem
  aranha = loadImage('Aranha.png');
  hulk = loadImage('hulk1.png');
  vs = loadImage('vs.png');
  placar = loadImage('placar.png');
  tigre = loadImage('formadores.png');
  professor = loadImage('RAFAEL.png')
   //tocar som de fundo
  fundoSom.loop();// sem parar
  fundoSom.setVolume(0.03);
  
}

function draw() {
  //função desenhar
  
 // background(0); //fundo preto
  background(image1);//coloca imagem de fundo
 imagemTigre();
  
  incluiPlacar();
  marcaPonto();
  mostraBolinha(); //chamando a função mostra bolinha
  movimentaBolinha(); //chamando a função para movimentar a //bolinha
  verificaColisaoBorda(); /*chamando a função que verifica se
  a bolinha esta batendo nas bordas*/
  //mostra raquete
  mostraRaquete(xRaquete, yRaquete);// por parâmetros
 mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  //função movimenta a raquete setas pra cima e pra baixo
  movimentaRaqueteSetas();

  //verificaColisaoRaquete();
  
  //movimentar a raquete do oponente automático
  movimentaRaqueteOponente();
  
//  colisaoMinhaRaqueteBiblioteca();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  
 
  
}

//criando uma função para mostrar a bolinha
function mostraBolinha() {
  //x - y e o tamanho (diâmetro)
  fill(color(0,255,255));// cor da bolinha
  circle(xBolinha, yBolinha, tamanhoBolinha) ;
  
  
}

//criando uma função para movimentar a bolinha
function movimentaBolinha() {
  // movimenta horizontalmente para direita com velocidade
  xBolinha += xBolinhaVelocidade;
  // movimenta verticalmente para baixo ou em diagonais
  yBolinha += yBolinhaVelocidade;
}

function verificaColisaoBorda() {
  /*
  width uma variável que é original do p5js
  height uma variável que é original do p5js
  */

  //width tamanho da largura (600) se tocar ele vai voltar
  //xBolinha < 0 sempre o p5js lado esquedo é 0 vai bater
  //e voltar
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    //multiplicando por -1 quando bater nas borda direita       //ele altera
    //com valores negativos e se move para esquerda
    //bater na borda < 0  ele bate e volta.
    xBolinhaVelocidade *= -1;
  }

  //height tamnaho da altura (400) se tocar ele vai          //voltar
  //yBolinha < 0 sempre o p5js lado esquedo é 0 vai bater
  //e voltar
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    //multiplicando por -1 quando bater nas borda cima e       //baixo ele       //altera
    //com valores negativos e se move
    //bater na borda < 0  ele bate e volta.
    yBolinhaVelocidade *= -1;
  }
}

//criando uma função para criar raquete
//usando 2 parâmetros para usar a mesma função 
// mostra raquete e do oponente também
function mostraRaquete(x,y) { 
  fill(color(20,20,255));//cor das raquetes
  rect(x, y, larguraRaquete, alturaRaquete);
  
  
}



//criando função movimenta raquete
function movimentaRaqueteSetas() {
  //se a tecla for pressionada pra cima
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }

  //se a tecla for pressionada pra baixo
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

//criando função colisão raquete com a bolinha
function verificaColisaoRaquete() {
  if (
    xBolinha - raio < xRaquete + larguraRaquete &&
    yBolinha - raio < yRaquete + alturaRaquete &&
    yBolinha + raio > yRaquete
  ) {
    xBolinhaVelocidade *= -1;
  }

  //xRaquete, yRaquete, larguraRaquete, alturaRaquete);
}

// função movimentar a raquete do oponente

function movimentaRaqueteOponente() {
  velocidadeYoponente = yBolinha - yRaqueteOponente - larguraRaquete /2 -30;  
  yRaqueteOponente += velocidadeYoponente;
  
}


function verificaColisaoRaquete(x, y){
  
   colidiu =
  collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  
  if(colidiu){
     xBolinhaVelocidade *= -1;
    raquetada.play();
    raquetada.setVolume(0.15);
     }
}

function imagemTigre(){
  
   image(tigre, 150, 100, 300, 300);
   image(professor, 150,360, 300, 20);
  
}


function incluiPlacar (){
  textAlign(CENTER);//CENTRALIZANDO O PLACAR
  textSize(18);//tamanho da fonte
  fill(color(255,55,0));//cor dos pontos
  image(placar, 160, 3, 300, 50);
  
  image(aranha, 130, 10, 40, 40);//imagem homem aranha
  text(meusPontos, 200, 25);

  image(hulk, 440, 10, 60, 50);// imagem hulk
  text(pontosDoOponente, 420, 25);
     image(vs, 280, 5, 60, 50);//imagem vs
 
}




function marcaPonto(){
  
  if(xBolinha > 585){
    meusPontos += 1;
    pontoSomAranha.play();
    pontoSomAranha.setVolume(0.15);
  }
  if (xBolinha < 15){
    pontosDoOponente += 1;
    pontoSomHulk.play();
    pontoSomHulk.setVolume(0.15);
  }
  
}


/*
function colisaoMinhaRaqueteBiblioteca() {
  colidiu =
  collideRectCircle(xRaquete, yRaquete, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  
  colidiuOponente =  collideRectCircle(xRaqueteOponente, yRaqueteOponente, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  
  if(colidiu){
     xBolinhaVelocidade *= -1;
     }
  
  if(colidiuOponente){
     xBolinhaVelocidade *= -1;
     }
}
*/
