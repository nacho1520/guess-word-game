const generateUserInput = (word) => {
    const letterContainer = document.querySelector('.letters-display');
    letterContainer.textContent = "";

    for(var i = 0; i < word.length; i++) {
        const node = document.createElement("p");
        node.classList.add('letter');
        if(i==0) {
            node.appendChild(document.createTextNode('_'));
            node.classList.add('active');
        }
        letterContainer.appendChild(node);
    }
};

const changeUserInput = (counter) => {
    const letterList = document.querySelectorAll('.letter');
    letterList[counter].innerHTML = '_';
    letterList[counter].classList.add('active');
};

const writeUserLetter = (counter, key) => {
    const letterList = document.querySelectorAll('.letter');
    letterList[counter].innerHTML = key;
    letterList[counter].classList.remove('active');
};

const gameWon = (userLetters, randomWord) => {
    return userLetters.join('') == randomWord;
};

const cleanUserInput = () => {
    const letters = document.querySelectorAll('.letter');

    for(var i = 0; i < letters.length; i++) {
        letters[i].innerHTML = '';
        letters[i].classList.remove('active');
    }

    letters[0].innerHTML = '_';
    letters[0].classList.add('active');
};

const cleanMistakes = () => {
    const mistakes = document.querySelectorAll('.mistake');

    for(var i = 0; i < mistakes.length; i++ ) {
        mistakes[i].classList.remove('active');
    }
};

const getRandomInt = max => {
    return Math.floor(Math.random() * max);
};

const getRandomWord = words => {
    return words[getRandomInt(words.length)];
};


window.addEventListener('load', () => {
    // Global status
    const words = ['flower', 'ball', 'planet', 'raccoon', 'shark'];
    var word = "";
    var randomWord = "";
    var correctWords = [];
    var trieCounter = 0;
    var mistakes = [];
    var counter = 0;

    // Document widgets
    const wordDisplay = document.querySelector('.word-ui');
    const triesLabel = document.querySelector('.label');
    const mistakesList = document.querySelectorAll('.mistake');
    const mistakeLetters = document.querySelector('.used-words');
    const resterBtn = document.querySelector('#reset');
    const randomBtn = document.querySelector('#random-btn');

    const generateRandomWord = () => {
        word = getRandomWord(words);;
        randomWord = word.split('').sort(function(){ return 0.5-Math.random() }).join('');
        const pNode = document.createElement('p');
        pNode.appendChild(document.createTextNode(randomWord));
        wordDisplay.textContent = "";
        wordDisplay.appendChild(pNode);
        generateUserInput(word);
    };

    generateRandomWord();
    
    const restartGame = () => {
        cleanUserInput();
        cleanMistakes();
        trieCounter = 0;
        mistakes = [];
        counter = 0;
        correctWords = [];
        mistakeLetters.innerHTML = '';
        triesLabel.innerHTML = 'Tries (0/5):';
    };

    document.onkeydown = (e) => {
        var keyPress = e.key;
        console.log('Key:' + keyPress);
        if(keyPress == word[counter]) {
            correctWords[counter] = keyPress;
            writeUserLetter(counter, keyPress);
            if(gameWon(correctWords, word)) {
                alert("Success!");
            } else {
                counter++;
                changeUserInput(counter);
            }
        } else {
            mistakes.push(keyPress);
            mistakeLetters.innerHTML = mistakeLetters.innerHTML + keyPress + ', '; 
            trieCounter++;
            if(trieCounter >= 6) {
                restartGame();
            } else {
                triesLabel.innerHTML = 'Tries ('+ trieCounter +'/5):';
                for(var i = 0; i < trieCounter; i++) {
                    mistakesList[i].classList.add('active');
                }
            }
        }
    };

    resterBtn.addEventListener('click', () => {
        restartGame();
    });

    randomBtn.addEventListener('click', () => {
        restartGame();
        generateRandomWord();
    });

});