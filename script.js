const wordContainer = document.querySelector('.word');
const correctCount = document.querySelector('.correct-count');
const wrongCount = document.querySelector('.wrong-count');
const wordMistakes = document.querySelector('.word-mistakes');
const timer = document.querySelector('#timer');

const words = ['laptop', 'cherry', 'city', 'cookie', 'phone', 'cat', 'book'];
let currentWord = '';
let currentLetterIndex = 0;
let currentMistakes = 0
let correctWords = 0;
let wrongWords = 0;
let timerId;

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function insertWord(word) {
    wordContainer.innerHTML = '';

    word.split('').forEach((letter) => {
        const span = document.createElement('span');
        span.textContent = letter;
        wordContainer.append(span);
    });
}

function start() {
    currentWord = getRandomWord();
    currentLetterIndex = 0;
    currentMistakes = 0;
    wordMistakes.textContent = currentMistakes;
    insertWord(currentWord);
    document.addEventListener('keydown', keyPress);
    checkGameEnd ();
}

function keyPress(event) {
    const pressedKey = event.key;
    const expectedLetter = currentWord[currentLetterIndex];
    const spans = wordContainer.querySelectorAll('span');

    if (pressedKey === expectedLetter) {
        spans[currentLetterIndex].classList.add('c');
        currentLetterIndex++;
    } else {
        spans[currentLetterIndex].classList.add('w');
        currentMistakes++;
        wordMistakes.textContent = currentMistakes;
        setTimeout(() => spans[currentLetterIndex].classList.remove('w'), 200);
    }

    if (currentLetterIndex === currentWord.length) {
        spans.forEach((span) => span.classList.add('c'));
        if (currentMistakes === 0) {
            correctWords++;
            correctCount.textContent = correctWords;
        } else {
            wrongWords++;
            wrongCount.textContent = wrongWords;
        }

        setTimeout(start, 500);
    }
}

start();
startTimer()

function checkGameEnd () {
    if (correctWords === 5) {
        alert('Вы выиграли!');
        reset();
        return;
    }

    if (wrongWords === 5) {
        alert('Вы проиграли:( Попробуйте еще раз!');
        reset();
        return;
    }
}

function reset() {
    correctWords = 0;
    wrongWords = 0;
    correctCount.textContent = correctWords;
    wrongCount.textContent = wrongWords;
    startTimer()
    start();
}


function startTimer() {
    clearInterval(timerId);
    let minutes = 0;
    let seconds = 0;
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    timerId = setInterval(() => {
        seconds++;
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (seconds === 59) {
            minutes++;
            seconds = 0;
        }
    }, 1000);
}
