/*
Classes and functions to get the sentences prepared to be used
*/

/**
 * @description Creates a new sentence object
 * @class
 * @param {Object} sentence - An object containing the sentence to be sorted and an explanation sentence
 * @returns {Object} - An object ready to be used by SortableJS
 */
class Sentence {
    constructor(sentence, id) {
        this.id = id // the id number of the sentence
        this.comment = sentence.comment // string that stores the sentence comment
        this.text = sentence.words // string that stores the sentence to be sorted
        this.sentenceInOrder = this.text.split(" ") // array that stores the split sentence
        this.currentCorrectWord = 0 // stores how many words are correct already while student is sorting
        this.currentlyLeft = [] // array that stores the words still left to be sorted
        this.complete = false // becames true when sentence is sorted
        this.sentenceShuffled = this.shuffle // array that stores the shuffled sentence
    }

    shuffle() {
        let auxArray = [...this.sentenceInOrder]
        // make sure the first word in the shuffled sentence is different from 
        // the first word in the sentence in order (the while conditional statement)
        do {
            this.shuffleWords(auxArray)
        } while ((auxArray[0].localeCompare(this.sentenceInOrder[0])) == 0)
        return [...auxArray]
    }

    // function that implements Fisher-Yates shuffle
    shuffleWords(array) {
      for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1))
          let temp = array[i]
          array[i] = array[j]
          array[j] = temp
      }
    }
}

// function to organise all sentence objects in an array
const loadSentences = sentences => {
  let result = []
  sentences.forEach((currentValue, index) => {
      result.push(new Sentence(currentValue, index))
    })
    return result
}

module.exports = loadSentences