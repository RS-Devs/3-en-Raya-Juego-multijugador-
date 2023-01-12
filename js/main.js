
// Seleccionamos todos los elementos con la clase "box" que estén dentro de un elemento con la clase "table"
const boxList = document.querySelectorAll(".table .box");

// Creamos una variable "turn" para llevar el control de quién tiene el turno
let turn = true;

// Creamos un array llamado "movesArray" que va a contener los movimientos de cada jugador
// Lo inicializamos con 9 espacios vacíos
const movesArray = new Array(9).fill(null);

// Creamos una función llamada "checkWin" que recibe un array con los movimientos y devuelve el ganador (si es que hay uno)
function checkWin(moves) {
  // Creamos un array "lines" con las combinaciones de casillas que pueden llevar a la victoria
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Recorremos cada combinación de casillas
  for (const line of lines) {
    // Si las tres casillas tienen el mismo contenido y no están vacías, devolvemos el ganador
    if (
      moves[line[0]] == moves[line[1]] &&
      moves[line[1]] == moves[line[2]] &&
      moves[line[0]] != null
    ) {
      // Mostramos la animación y el confeti para celebrar la victoria
      document.getElementById("animation").style.display = "block";
      document.getElementById("confetti").style.display = "block";

      return moves[line[0]];
    }
  }

  // Si no hay un ganador y no quedan espacios vacíos en el array, devolvemos "Empate"
  if (moves.indexOf(null) === -1) {
    document.getElementById("desanimation").style.display = "block";
    return alert("Habéis quedado en tablas!");
  }

  // Si no hay un ganador ni empate, devolvemos null
  return null;
}

// Recorremos cada casilla y le agregamos un evento "click"
boxList.forEach((box, index) => {
  box.addEventListener(
    "click",
    function () {
      // Si es el turno del jugador "Nginx", le asignamos la clase "mark-nginx" a la casilla
      if (turn) {
        box.classList.add("mark-nginx");
      }
      // Si es el turno del jugador "Nmap", le asignamos la clase "mark-nmap" a la casilla
      else {
        box.classList.add("mark-nmap");
      }

      // Guardamos el movimiento en el array "movesArray"
      movesArray[index] = turn;

      // Llamamos a la función "checkWin" para ver si hay un ganador o empate
      const winner = checkWin(movesArray);

      // Si hay un ganador o empate, mostramos un mensaje y detenemos el juego
      if (winner != null) {
        alert(
          winner ? "El jugador Nginx ha ganado!" : "El jugador Nmap ha ganado!"
        );
      }
      // Si no hay un ganador ni empate, cambiamos el turno de jugador
      else {
        turn = !turn;
      }
    },
    { once: true }
  );
});



