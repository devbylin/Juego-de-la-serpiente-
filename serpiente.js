// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const TAMANIO_CELDA = 25;

const serpiente = [
  {x:12, y:8},
  {x:11, y:8},
  {x:10, y:8},
  {x:9, y:8},
  {x:8, y:8}
];
let comida = {
  x: 10,
  y: 10
}
let intervaloSerpiente = null;
let juegoActivo = false;
let direccionActual = "derecha";
let puntaje = 0;


// Primera pintura del juego al cargar la página
dibujarTodo();
generarComida();
// =========================
// FUNCIONES DE DIBUJO
// ========================= 

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
  pintarComida();
}
function dibujarTablero(){
  ctx.strokeStyle = "rgba(238, 245, 241, 0.02)";
  ctx.lineWidth = 1;

  for(let x = 0; x <= canvas.width; x += TAMANIO_CELDA){
    ctx.beginPath();
    ctx.moveTo(x , 0);
    ctx.lineTo(x , canvas.height);
    ctx.stroke();
  }
  for(let y = 0; y <= canvas.height; y += TAMANIO_CELDA){
    ctx.beginPath();
    ctx.moveTo(0 , y);
    ctx.lineTo(canvas.width , y);
    ctx.stroke();
  }
}
function pintarParte(lineaX,lineaY,color,colorBorde){
  let x = lineaX * TAMANIO_CELDA;
  let y = lineaY * TAMANIO_CELDA;

  ctx.fillStyle = color;
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = colorBorde || "#22CC88";
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}
function pintarSerpiente(){
  for(let i = 0; i < serpiente.length; i++){
    let segmento = serpiente[i];
    let color, borde;
    if(i == 0){
      color = "#2604b0"; 
      borde = "#65f82b";
    }else{
      color = "#FF4444";
      borde = "#dbfc38";
    }
    pintarParte(segmento.x , segmento.y, color, borde);
  }
}
function moverDerecha() {
  let cabeza = serpiente[0];
  let nuevaCabeza = {
    x: cabeza.x + 1,
    y: cabeza.y
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}
function moverIzquierda() {
  let cabeza = serpiente[0];
  let nuevaCabeza = {
    x: cabeza.x - 1,
    y: cabeza.y
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}
function moverArriba() {
  let cabeza = serpiente[0];
  let nuevaCabeza = {
    x: cabeza.x,
    y: cabeza.y - 1
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}
function moverAbajo() {
  let cabeza = serpiente[0];
  let nuevaCabeza = {
    x: cabeza.x,
    y: cabeza.y + 1
  };
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}
function cambiarDireccion(nuevaDireccion) {
  if(nuevaDireccion == "derecha" && direccionActual == "izquierda") return;
  if(nuevaDireccion == "izquierda" && direccionActual == "derecha") return;
  if(nuevaDireccion == "arriba" && direccionActual == "abajo") return;
  if(nuevaDireccion == "abajo" && direccionActual == "arriba") return;
  
  direccionActual = nuevaDireccion;
  console.log("🔄 Dirección: " + direccionActual)
}
function moverSerpiente(){
  if(!juegoActivo) return;
    let cola = serpiente[serpiente.length - 1];
    let colaX = cola.x;
    let colaY = cola.y;

   if(direccionActual == "derecha") {
       moverDerecha();
    }else if (direccionActual == "izquierda") {
       moverIzquierda();
    }else if (direccionActual == "arriba") {
       moverArriba();
    }else if (direccionActual == "abajo") {
      moverAbajo();
    }
    if(atraparComida()){
      puntaje = puntaje + 1;

    let marcador = document.getElementById("puntaje");
    if(marcador != null){
      marcador.textContent = puntaje;
    }

    let ultimoSegmento = {
      x: colaX,
      y: colaY
    };
  serpiente.push(ultimoSegmento);
  generarComida();
  }
  dibujarTodo();
}
function iniciarJuego(){
  if(intervaloSerpiente !== null){
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null
  }
  intervaloSerpiente = setInterval(moverSerpiente, 500);
  juegoActivo = true;
  console.log("Juego iniciado(ID intervalo: " + intervaloSerpiente + ")");
}
function pausarJuego(){
  if(intervaloSerpiente !== null){
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;
    juegoActivo = false;
    console.log("juego pausado");
  }
}
function generarComida(){
  let lineasVerticales = canvas.width / TAMANIO_CELDA;
  let lineasHorizontales = canvas.height / TAMANIO_CELDA;
  let posicionValida = false;
  let randomX, randomY;

  while(!posicionValida){
    randomX = Math.floor(Math.random() * lineasVerticales);
    randomY = Math.floor(Math.random() * lineasHorizontales);

    posicionValida = true;
    for(let i = 0; i < serpiente.length; i++){
      if(serpiente[i].x == randomX && serpiente[i].y == randomY){
        posicionValida = false;
        break;
      }
    }
  }

  comida.x = randomX;
  comida.y = randomY;
}
function pintarComida(){
  pintarParte(comida.x, comida.y, "#FFA500");
}
function atraparComida(){
  let cabeza = serpiente[0];
  if(cabeza.x == comida.x && cabeza.y == comida.y){
    return true;
  }else{
    return false;
  }
}
function crecerSerpiente(){
  let ultimoSegmento = serpiente[serpiente.length - 1];
  let nuevoSegmento = {
    x: ultimoSegmento.x,
    y: ultimoSegmento.y
  };
  serpiente.push(nuevoSegmento);
}