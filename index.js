const generateUserInput = (word) => {
    const letterContainer = document.querySelector('.letters-display');

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

window.addEventListener('load', () => {
    // Global status
    const word = "flower";
    const randomWord = "relowf";
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

    const pNode = document.createElement('p');
    pNode.appendChild(document.createTextNode(randomWord));
    wordDisplay.appendChild(pNode);
    
    generateUserInput(word);

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

});