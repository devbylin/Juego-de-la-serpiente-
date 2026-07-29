// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const TAMANIO_CELDA = 25;

const serpiente = [
  {x:12, y:8},
  {x:11, y:8},
  {x:10, y:8}
  
];
let comida = {x: 10, y: 10};
let intervaloSerpiente = null;
let juegoActivo = false;
let direccionActual = "derecha";
let puntaje = 0;
let velocidad = 1000;


// Primera pintura del juego al cargar la página
generarComida();
dibujarTodo();
actualizarPuntaje();

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
  let nuevaX = cabeza.x + 1;
  let nuevaY = cabeza.y;
  let limite = verificarLimites(nuevaX,nuevaY);
  if(limite !== null){
    gameOver("Intentaste salir por el borde" + limite);
    return;
  }

  let nuevaCabeza = {x: nuevaX, y: nuevaY};
  if(validarColision(nuevaCabeza)){
    gameOver("Te chocaste con tu propio cuerpo");
    return;
  }
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}
function moverIzquierda() {
  let cabeza = serpiente[0];
  let nuevaX = cabeza.x -1;
  let nuevaY = cabeza.y;

  let limite = verificarLimites(nuevaX, nuevaY);
  if(limite !== null){
    gameOver("Intestaste salir por el borde" + limite);
    return;
  }

  let nuevaCabeza = {x: nuevaX, y: nuevaY};
  if(validarColision(nuevaCabeza)){
    gameOver("Te chocaste con tu propio cuerpo");
    return;
  }
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}
function moverArriba() {
  let cabeza = serpiente[0];
  let nuevaX = cabeza.x;
  let nuevaY = cabeza.y - 1;

  let limite = verificarLimites(nuevaX, nuevaY);
  if(limite !== null){
    gameOver("Intentaste salir por el borde" + limite);
    return;
  }

  let nuevaCabeza = {x: nuevaX, y: nuevaY};
  if(validarColision(nuevaCabeza)){
    gameOver("Te chocaste con tu propio cuerpo");
    return;
  }
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}
function moverAbajo() {
  let cabeza = serpiente[0];
  let nuevaX = cabeza.x;
  let nuevaY = cabeza.y + 1;

  let limite = verificarLimites(nuevaX, nuevaY);
  if(limite !== null){
    gameOver("Intentaste salir por el borde" + limite);
    return;
  }
  let nuevaCabeza = {x: nuevaX, y: nuevaY};
  if(validarColision(nuevaCabeza)){
    gameOver("Chocaste con tu propio cuerpo");
    return;
  }

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
  let cabeza = serpiente[0];
  let nuevaX = cabeza.x;
  let nuevaY = cabeza.y;

  if(direccionActual == "derecha") {
    nuevaX = cabeza.x + 1;
  }else if (direccionActual == "izquierda") {
    nuevaX = cabeza.x - 1 ; 
  }else if (direccionActual == "arriba") {
    nuevaY = cabeza.y - 1;
  }else if (direccionActual == "abajo") {
    nuevaY = cabeza.y + 1;
  }

  let limite = verificarLimites(nuevaX, nuevaY);
  if(limite !== null){
    gameOver("Intentaste salir por el borde " + limite);
    return;
  }

  let nuevaCabeza = { x: nuevaX, y: nuevaY };
  if (validarColision(nuevaCabeza)) {
    gameOver("Te chocaste con tu propio cuerpo");
    return;
  } 

  let cola = serpiente[serpiente.length - 1];
  let colaX = cola.x;
  let colaY = cola.y;

  // Mover la serpiente
  serpiente.unshift(nuevaCabeza);
  serpiente.pop();

  // Verificar si atrapó la comida
  if(atrapaComida()){
    puntaje++;
    console.log("Puntaje: " + puntaje);
    actualizarPuntaje();
    serpiente.push({ x: colaX, y: colaY });
    generarComida();
  }
  if(puntaje % 2 === 0 && velocidad > 300){
    let nuevaVelocidad = velocidad - 20;
    cambiarVelocidad(nuevaVelocidad);
  }
  dibujarTodo();
}
function iniciarJuego(){
  if(intervaloSerpiente !== null){
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null
  }
  intervaloSerpiente = setInterval(moverSerpiente, velocidad);
  juegoActivo = true;
  console.log("Juego iniciado(ID intervalo: " + intervaloSerpiente + ")");

 let mensaje = document.getElementById("mensaje");
 mensaje.textContent = "¡Jugando!";
 mensaje.style.color = "red";
}
function pausarJuego(){
  if(intervaloSerpiente !== null){
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;
    juegoActivo = false;
    console.log("juego pausado");
  }
  let mensaje = document.getElementById("mensaje");
 mensaje.textContent = "¡Juego pausado!";
 mensaje.style.color = "orange";
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
  pintarParte(comida.x, comida.y, "#FFA500","#FF7700");
}
function atrapaComida(){
  let cabeza = serpiente[0];
  if(cabeza.x == comida.x && cabeza.y == comida.y){
    return true;
  }else{
    return false;
  }
}
function actualizarPuntaje() {
  let elemento = document.getElementById("puntaje");
    if (elemento) {
      elemento.textContent = puntaje;
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
function validarColision(nuevaCabeza) {
  for (let i = 1; i < serpiente.length; i++) {
    if (serpiente[i].x === nuevaCabeza.x && serpiente[i].y === nuevaCabeza.y) {
     return true;
    }
  }
  return false;
}
function verificarLimites(nuevaX,nuevaY){
  let columnas = canvas.width / TAMANIO_CELDA;
  let filas = canvas.height / TAMANIO_CELDA;

  if(nuevaX < 0){
    return "izquierdo";
  }
  if(nuevaX >= columnas){
    return "derecho";
  }
  if(nuevaY < 0){
    return "superior";
  }
  if(nuevaY >= filas){
    return "inferior";
   } 
   return null;
}
function gameOver(motivo){
  if(intervaloSerpiente !== null){
    clearInterval(intervaloSerpiente);
    intervaloSerpiente = null;
  }
  juegoActivo = false;
  console.log("game over"+motivo);

  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#FF4444";
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("💀 GAME OVER", canvas.width / 2, canvas.height / 2 - 30);
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Puntaje: " + puntaje, canvas.width / 2, canvas.height / 2 + 40);
    
    alert("💀 GAME OVER\n\n" + motivo + "\nPuntaje: " + puntaje); 
}
function reiniciarJuego(){
  if(intervaloSerpiente !== null){
    clearInterval(intervaloSerpiente);
    intervaloSerpiente= null;
  }
  velocidad = 1000;
  juegoActivo = false;
  direccionActual = "derecha";
  puntaje = 0;
  actualizarPuntaje();

  serpiente.length = 0;
  serpiente.push({ x: 12, y: 8 });
  serpiente.push({ x: 11, y: 8 });
  serpiente.push({ x: 10, y: 8 });
  generarComida();
  dibujarTodo();
  let mensaje = document.getElementById("mensaje");
  mensaje.textContent = "¡Juego reiniciado!";
  mensaje.style.color = "black";

}
function cambiarVelocidad(nuevaVelocidad){
  if(nuevaVelocidad < 50){
    nuevaVelocidad = 50;
  }
  if(nuevaVelocidad > 1000){
    nuevaVelocidad = 1000;
  } 
  velocidad = nuevaVelocidad;
  if(juegoActivo){
    if(intervaloSerpiente !== null) {
      clearInterval(intervaloSerpiente);
      intervaloSerpiente = null;
    }
    intervaloSerpiente = setInterval(moverSerpiente, velocidad);
  }
}
