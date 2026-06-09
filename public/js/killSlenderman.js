window.addEventListener("load", function(){
/*alert("debes iniciar sesión primero")*/
   let paAtras = document.getElementById('paAtras');
   let again = document.getElementById('again');
   let muteBtn;
   let isMuted = false;
   musica = document.getElementById("musica");
   muteBtn = document.getElementById("muteBtn");
   
   if (musica) {
        musica.volume = 0.15; 
    }
   if(muteBtn){
   muteBtn.addEventListener("click", toggleMusic);
   }

   paAtras.addEventListener("click", () => {
        window.location.href = "/";
    })
    if (again) {
    again.addEventListener("click", () => {
        resetGame(); // ¡Llamada instantánea sin recargar!
    });
}
function toggleMusic(){
  if(!musica)return;

  if(isMuted){
    musica.play();
    muteBtn.innerHTML = "🔊"; 
    isMuted = false;
  }else{
    musica.pause();
    muteBtn.innerHTML = "🔇";
    isMuted = true;
  }
 }
/*ahora empieza lo epico */
initGame();
})

/*fondo */
let board;
let context;
let puntuacion = document.getElementById('puntuacion');
let spawnTimer;

/*sonido */
let disparo = document.getElementById('disparo');
let gameOverSound = document.getElementById('gameOver');


/*chuck */
let chuckWidth = 90;
let chuckHeight = 90;

/*interfaz*/
let gameStarted = false;
let menuImagen = new Image();
menuImagen.src = "https://res.cloudinary.com/dduyxqrqt/image/upload/v1780524838/portada_uewklp.gif";

/*game over*/
let gameOver = false;
let playedGameOverSound = false;
let gameOverImg = new Image();
gameOverImg.src = "https://res.cloudinary.com/dduyxqrqt/image/upload/v1780524867/bitmap_drvpkj.png";

let chuck = {
  x : 0,
  y : 0,
  width : chuckWidth,
  height : chuckHeight,
  speed: 6
}

let chuckImg;
let keysPressed = {
    w: false,
    s: false,
    a: false,
    d: false
}

/*slendy
let slendermanWidth = 35;
let slendermanHeight = 35;
let slenderman = {
  x : 0,
  y : 0,
  width : slendermanWidth,
  height : slendermanHeight,
  speed: 4
}
let slendermanImg;*/
let score = 0;
let enemies = [];
let slendermanImg = new Image();
slendermanImg.src = "https://res.cloudinary.com/dduyxqrqt/image/upload/v1780242983/slenderman_ewergw.png"; 

function spawnEnemy(){
    if(!board)return;
    let size = 130;
    let randomX, randomY;
    let distanciaSegura = 280;
    let posicionValida = false;

    while(!posicionValida){
      randomX = Math.random() * (board.width - size);
      randomY = Math.random() * (board.height - size);

      let diferenciaX = randomX - chuck.x;
      let diferenciaY = randomY - chuck.y;

      let distanciaReal = Math.sqrt(diferenciaX * diferenciaX + diferenciaY * diferenciaY); /*teorema de pitagoras */

      if(distanciaReal > distanciaSegura){
        posicionValida = true;
      }
    }
    /*let randomX = Math.random() * (board.width - size);
    let randomY = Math.random() * (board.height - size); */

    let velocidadDinamica = Math.min(6, 2 + (score * 0.1));

    let enemy = {
    x: randomX,
    y: randomY,
    width: size,
    height: size,
    speed: velocidadDinamica
};
enemies.push(enemy);
}


function initGame(){
    board = document.getElementById("board");
    context = board.getContext("2d");
    //setInterval(spawnEnemy, 2000);

chuck.x = (board.width / 2) - (chuck.width / 2);
chuck.y = (board.height / 2) - (chuck.height / 2);

chuckImg = new Image();
chuckImg.src = "https://res.cloudinary.com/dduyxqrqt/image/upload/v1780096097/chuck_norris_sjzyob.png";

chuckImg.onload = function() {
        // Iniciar el bucle del juego una vez que la imagen cargue
        requestAnimationFrame(update);
    }

    window.addEventListener("keydown", function(e) {
        let key = e.key.toLowerCase();
        if (key === "w" || key === "a" || key === "s" || key === "d") {
            keysPressed[key] = true;
        }
    });

    window.addEventListener("keyup", function(e) {
        let key = e.key.toLowerCase();
        if (key === "w" || key === "a" || key === "s" || key === "d") {
            keysPressed[key] = false;
        }
    });

//document.addEventListener("keydown", moveChuck);
board.addEventListener("click", shootEnemy);
}

function updateEnemies(){
    for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];

    if(enemy.x < chuck.x){
        enemy.x += enemy.speed;
    }else if(enemy.x > chuck.x){
        enemy.x -= enemy.speed;
    }

    if(enemy.y < chuck.y){
        enemy.y += enemy.speed;
    }else if(enemy.y > chuck.y){
        enemy.y -= enemy.speed;
    }

    context.drawImage(slendermanImg, enemy.x, enemy.y, enemy.width, enemy.height);

    if(checkCollision(chuck, enemy)){
        gameOver = true;
    }
}}

function update(){
    requestAnimationFrame(update);
    /*context.clearRect(0, 0, board.width, board.height);
    context.drawImage(chuckImg, chuck.x, chuck.y, chuck.width, chuck.height);*/
    if(!gameStarted){
        context.drawImage(menuImagen, 0, 0, board.width, board.height);
        context.fillStyle = "#ad0606";
        context.fillRect(board.width / 2 - 100, board.height / 2 - 25, 200, 50);


        context.fillStyle = "#ffffff"; // Texto blanco
        context.font = "bold 20px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("START GAME", board.width / 2, board.height / 2);

        return;
    }
    
    if(gameOver){
        context.drawImage(gameOverImg, 0, 0, board.width, board.height)

         if (!playedGameOverSound) {
            gameOverSound.play();
            playedGameOverSound = true; // Marcamos como "ya sonó"
        }
        return;
    }

    if (keysPressed.w) chuck.y -= chuck.speed;
    if (keysPressed.s) chuck.y += chuck.speed;
    if (keysPressed.a) chuck.x -= chuck.speed;
    if (keysPressed.d) chuck.x += chuck.speed;

    if (chuck.x < 0) { 
        chuck.x = 0; // No deja que pase de la izquierda
    }
    if(chuck.x > board.width - chuck.width){
        chuck.x = board.width - chuck.width;
    }
    if (chuck.y < 0) { 
        chuck.y = 0; // No deja que suba más allá del techo
    }
    if (chuck.y > board.height - chuck.height) { 
        chuck.y = board.height - chuck.height; // No deja que baje más allá del suelo
    }

    // Limpiar y redibujar
    context.clearRect(0, 0, board.width, board.height);
    context.drawImage(chuckImg, chuck.x, chuck.y, chuck.width, chuck.height);

    updateEnemies();
}
function iniciarBucleSpawn(){
    if(gameOver || !gameStarted)return;
    spawnEnemy();
    let tiempoSpawn  = Math.max(400, 2000 - (score * 2));

    spawnTimer = setTimeout(iniciarBucleSpawn, tiempoSpawn);
}

function shootEnemy(e){
    if(gameOver)return;
    let rect = board.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    if(!gameStarted){
        if (mouseX >= board.width / 2 - 100 && mouseX <= board.width / 2 + 100 &&
            mouseY >= board.height / 2 - 25 && mouseY <= board.height / 2 + 25) {
            
            gameStarted = true;
            //setInterval(spawnEnemy, 2000);
            iniciarBucleSpawn();
        }
        return;
    }
    if (gameOver) return;

    disparo.currentTime = 0;    
    disparo.play();

    for(let i = enemies.length - 1; i >= 0; i--){
        let enemy = enemies[i];

        if(mouseX >= enemy.x && mouseX <= enemy.x + enemy.width &&
           mouseY >= enemy.y && mouseY <= enemy.y + enemy.height){

            enemies.splice(i, 1);
            score += 10;
            
            puntuacion.innerHTML = score;
            console.log("slenderman eliminado! puntación: " + score);
            break;
           }
    }
}

function checkCollision(rect1, rect2){
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
}


function resetGame(){
    if(gameOverSound){
        gameOverSound.pause();
        gameOverSound.currentTime = 0;
    }

    clearTimeout(spawnTimer);
    enemies = [];
    score = 0;
    if(puntuacion){
        puntuacion.innerHTML = "0";
    }
    if(board){
        chuck.x = (board.width / 2) - (chuck.width / 2);
        chuck.y = (board.height / 2) - (chuck.height / 2);
    }

    gameOver = false;
    playedGameOverSound = false;
    gameStarted = false;

    iniciarBucleSpawn();
} 
 

/*function moveChuck(e){
    let key = e.key.toLowerCase();

    if(key === "w" || e.key === "ArrowUp"){
        chuck.y -= chuck.speed;
    }
    if(key === "s" || e.key === "ArrowDown"){
        chuck.y += chuck.speed;
    }
    if(key === "a" || e.key === "ArrowLeft"){
        chuck.x -= chuck.speed;
    }
    if(key === "d" || e.key === "ArrowRight"){
        chuck.x += chuck.speed;
    }
}*/