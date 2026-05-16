window.addEventListener("load", function(){
/*alert("debes iniciar sesión primero")*/
   let paAtras = document.getElementById('paAtras');
   let again = document.getElementById('again');

   paAtras.addEventListener("click", () => {
        window.location.href = "/";
    })
    /*again.addEventListener("click", () => {
        window.location.href = "/birdFlappy";
    })*/
/*ahora empieza lo epico */
})

/*fondo */
let board;
let boardWidth = 360;
let boardHeight = 590;
let context;

/*pajaro */
let birdWidth = 54;
let birdHeight = 54;
let birdX = birdWidth/1;
let birdY = /*birdHeight/1;*/ 250;

let bird = {
  x : birdX,
  y : birdY,
  width : birdWidth,
  height : birdHeight
}

/*tubos */
let pipesArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipepImg;

//pshysics
let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function(){
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");



    birdImg = new Image();
    birdImg.src = "https://res.cloudinary.com/dduyxqrqt/image/upload/v1778939395/palomaVolando_yusiid.png";
    
    birdImg.onload = function(){
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
    }

    topPipeImg = new Image ();
    topPipeImg.src = "https://res.cloudinary.com/dduyxqrqt/image/upload/v1778798108/toppipe_ilg6ne.png";

    bottomPipeImg = new Image ();
    bottomPipeImg.src = "https://res.cloudinary.com/dduyxqrqt/image/upload/v1778798188/bottompipe_uh5ilo.png";

    requestAnimationFrame(update);
    setInterval(placePipes, 1500);
    document.addEventListener("keydown", moveBird);
}

function update(){
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    velocityY += gravity;
    //bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0);
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)

    if (bird.y > board.height){
      gameOver = true;  
    }

    for (let i = 0; i < pipesArray.length; i++){
        let pipe = pipesArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if(!pipe.passed && bird.x > pipe.x  + pipe.width){
            score += 0.5; //porque hay 2 tuberias
            pipe.passed = true;
        }

        if(detectCollision(bird, pipe)){
            gameOver = true;
        }
    }

    //limpieza de tuberias, llamen a los plomeros
    while (pipesArray.length > 0 && pipesArray[0].x < -pipeWidth){
        pipesArray.shift();
    }

    context.fillStyle = "white";
    context.font = "40px Orbitron";
    context.fillText(score, 5, 45);

    if(gameOver){
        context.fillText("PERDEDOR >:D", 5, 90)
    }
}

function placePipes() {
    if(gameOver){
        return;
    }

    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;
 
    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipesArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight, 
        passed : false
    }
    pipesArray.push(bottomPipe);
}

function moveBird(e){
    if(e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX"){
        velocityY = -6;
    }

    if(gameOver){
        bird.y = birdY;
        pipesArray = [];
        score = 0;
        gameOver = false;
    }
}

function detectCollision(a, b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}