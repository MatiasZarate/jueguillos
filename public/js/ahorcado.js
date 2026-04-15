window.addEventListener("load", function(){
/*alert("debes iniciar sesión primero")*/
   let paAtras = document.getElementById('paAtras');
   let again = document.getElementById('again');

   paAtras.addEventListener("click", () => {
        window.location.href = "/";
    })
    again.addEventListener("click", () => {
        window.location.href = "/ahorcado";
    })

    const replaceAt = (string, character, index) => {
        return string.substring(0, index) + character + string.substring(index + character.length);
    }

    const words = ['caniche', 'gargola', 'mapache', 'ornitorrinco', 'danganronpa', 'turin', 'salamandra']
    const secretWord = words[Math.floor(Math.random() * words.length)];
    let hiddenWord = secretWord.replace(/./g, "_ ");
    /*alert(secretWord)*/
    document.querySelector('.hiddenWord').innerHTML = hiddenWord;
    let errorCounter = 0;

    const evaluateWord = () => {
        const input = document.querySelector('input');
        const letter = input.value.toLowerCase();//document.querySelector('input').value;
        let error = true;

        if(!letter) return;
        if(letter.length > 1) return

        for (let i = 0; i < secretWord.length; i++){
            if(secretWord[i] === letter){
            hiddenWord = replaceAt(hiddenWord, letter, i * 2)
            error = false;
            }
        }
        document.querySelector('.hiddenWord').innerHTML = hiddenWord;

        if(error){
            errorCounter++;
            const totalImagenes = 7; 
        if (errorCounter < totalImagenes) {
            document.querySelector('.imgAhorcado, [class^="imgAhorcado"]').className = `imgAhorcado${errorCounter + 1}`;
        }}
        
        input.value = '';
        input.focus();

        if(!hiddenWord.includes("_")){
            //alert("has ganao")
        finalizarJuego();
        document.querySelector('.resultado').innerHTML = "GANASTE :D";    
        }else if (errorCounter >= 6) {
        finalizarJuego();
        document.querySelector('.resultado').innerHTML = "Perdiste :(";
    }
    }

    document.querySelector('button').addEventListener('click', evaluateWord);

    const inputLetra = document.querySelector('.input');
    const botonVerificar = document.querySelector('.button');

    const finalizarJuego = () => {
    inputLetra.disabled = true;
    botonVerificar.disabled = true;
    inputLetra.style.cursor = "not-allowed";
    botonVerificar.style.cursor = "not-allowed";
    }
})