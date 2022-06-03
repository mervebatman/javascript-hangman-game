const word_element = document.getElementById("word"); 
const popup = document.getElementById("popup-container");
const message_element = document.getElementById("success-message");
const wrongLetters_element = document.getElementById("wrong-letters");
const body = document.querySelectorAll(".body");
const message = document.getElementById("message");
const playAgain = document.getElementById("play-again");

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

//random kelime getirme fonksiyonu
function getRandomWord() {
    const words = ["javascrıpt", "java", "python","html", "css", "php", "go", "flutter", "c", "react", "vue", "angular", "delphı", "asp", "matlab", "r", "ruby", "swıft", "vısualbasıc"];

    return words[Math.floor(Math.random() * words.length)];

}

//kelimelerin görünmesi için
function displayWord() {

    
    word_element.innerHTML = `
    ${selectedWord.split('').map(letter => `
    <div class="letter">
    ${correctLetters.includes(letter) ? letter : ''}
    </div>`).join('')}
    `;

    const w = word_element.innerText.replace(/\n/g, '');
    if(w === selectedWord) {
        popup.style.display = 'flex';
        message_element.innerHTML = `Tebrikler, kazandınız! <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
      </svg>`;
    }
}

// yanlış harfleri yazdırma fonksiyonu
function updateWrongLetters() {
    wrongLetters_element.innerHTML = `
        ${wrongLetters.length >0 ? '<h3 class="font-family">Hatalı Harfler</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    body.forEach((item, index) => {
        const errorCount = wrongLetters.length;

        if(index < errorCount) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    })

    if(wrongLetters.length == body.length) {
        popup.style.display = "flex";
        message_element.innerHTML = `Maalesef, kaybettiniz! <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-emoji-frown" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
      </svg>`;
    }
}

// bu harfi eklediniz uyarısı gösterme süresi
function displayMessage() {
    message.classList.add("show");

    setTimeout(function() {
        message.classList.remove('show');
    },2000)
}

// tekrar oyna butonu fonksiyonu
playAgain.addEventListener("click", function() {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    
    selectedWord = getRandomWord();

    displayWord();
    updateWrongLetters();

    popup.style.display = "none";
})

// klavyeden tuşlara basma
window.addEventListener("keydown", function(e){
    if(e.keyCode >= 65 && e.keyCode <=90) {
       const letter = e.key;

       if(selectedWord.includes(letter)) {
           if(!correctLetters.includes(letter)) {
               correctLetters.push(letter);
               displayWord();
           } else {
               // bu harfi eklediniz mesajı
               displayMessage();
           }
       }else {
           if(!wrongLetters.includes(letter)) {
               wrongLetters.push(letter);
               // hatalı harfleri güncelleme
               updateWrongLetters();
           } else {
               displayMessage();
           }
       }
    }
})

displayWord();