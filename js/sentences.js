/*
Classes and functions to get the sentences prepared to be used
*/

class Sentence {
    constructor(sentence) {
        this.code = sentence.code // string that stores the example code 
        this.text = sentence.words; // string that stores the sentence ti be sorted
        this.sentenceInOrder = this.text.split(" "); // array that stores the split sentence
        this.currentCorrectWord = 0; // stores how many words are correct already while student is sorting
        this.currentlyLeft = []; // array that stores the words still left to be sorted
        this.complete = false; // becames true when sentence is sorted
        this.sentenceShuffled = this.shuffle; // array that stores the shuffled sentence
    }

    shuffle() {
        let auxArray = [...this.sentenceInOrder];
        // make sure the first word in the shuffled sentence is different from 
        // the first word in the sentence in order (the while conditional statement)
        do {
            shuffleWords(auxArray);
        } while ((auxArray[0].localeCompare(this.sentenceInOrder[0])) == 0);
        return [...auxArray];
    }
}

// function to organise all sentence objects in an array
function loadSentences(sentences) {
    let result = [];
    sentences.forEach((currentValue) => {
      result.push(new Sentence(currentValue));
    });
    return result;
}

// function that implements Fisher-Yates shuffle
function shuffleWords(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}