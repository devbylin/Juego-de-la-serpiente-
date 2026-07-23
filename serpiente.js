
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");

    const TAMANIO_CELDA = 25;


    

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
      pintarParte(5,5);
      pintarParte(10,2);
      pintarParte(12,22);
      pintarParte(22,12);
      pintarParte(1,12);
      pintarParte(22,22);
    }
    function dibujarTablero(){
      ctx.strokeStyle = "rgba(99, 103, 101, 0.93)";
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
    function pintarParte(lineaX,lineaY){
      let x = lineaX * TAMANIO_CELDA;
      let y = lineaY * TAMANIO_CELDA;

      ctx.fillStyle = "#2604b0";
      ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

      ctx.strokeStyle = "#f64b07";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
    }



