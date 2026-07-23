
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const TAMANIO_CELDA = 25;

const serpiente = [
  {x:12, y:8},
  {x:11, y:11},
  {x:11, y:10},
  {x:11, y:9},
  {x:11, y:8}

];
// Primera pintura del juego al cargar la página
dibujarTodo();

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
}
function dibujarTablero(){
  ctx.strokeStyle = "rgba(238, 245, 241, 0.02)";
  ctx.lineWidth = 1;

  for(let x = 0; x <= canvas.width; x += TAMANIO_CELDA){
    ctx.beginPath();
    ctx.moveTo(x , 1);
    ctx.lineTo(x , canvas.height);
    ctx.stroke();
  }
  for(let y = 0; y <= canvas.height; y += TAMANIO_CELDA){
    ctx.beginPath();
    ctx.moveTo(1 , y);
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



