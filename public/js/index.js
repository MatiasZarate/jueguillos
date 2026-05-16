window.addEventListener("load", function(){
/*alert("debes iniciar sesión primero")*/
   let ahorcado = document.getElementById('ahorcado');
   let tateti = document.getElementById('tateti');
   let birdFlappy = document.getElementById('birdFlappy');

   ahorcado.addEventListener("click", () => {
        window.location.href = "/ahorcado";
    })
    tateti.addEventListener("click", () => {
        window.location.href = "/tateti";
    })
    birdFlappy.addEventListener("click", () => {
        window.location.href = "/birdFlappy";
    })
})