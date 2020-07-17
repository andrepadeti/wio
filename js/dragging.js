/*
Classes and functions to get the sentences prepared to be used
*/

class Sentence {
    constructor(sentence) {
        this.text = sentence;
        this.sentenceInOrder = this.text.split(" "); // array that stores the split sentence
        this.currentCorrectWord = 0; // stores how many words are correct already while student is sorting
        this.currentlyLeft = []; // array that stores the words still left to be sorted
        this.complete = false; // becames true when sentence is sorted
        this.sentenceShuffled = this.shuffle; // array that stores the shuffled sentence

        // this.shuffleWords = this.shuffleWords.bind(this);
    }

    shuffle() {
        let auxArray = [...this.sentenceInOrder];
        // make sure the first word in the shuffled sentence is different from 
        // the first word in the sentence in order (the while conditional statement)
        do {
            this.shuffleWords(auxArray);
        } while ((auxArray[0].localeCompare(this.sentenceInOrder[0])) == 0);
        return [...auxArray];
    }


    // auxiliary method that implements Fisher-Yates shuffle
    shuffleWords(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
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

$(document).ready( function() {

    // future implementation of query string parameters
    // https://www.sitepoint.com/get-url-parameters-with-javascript/
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const exercise = urlParams.get("ex");
    // console.log(exercise);
    
    var sentences = loadSentences(["The first sentence.","The second sentence.","Yet another sentence."]);

    // the audio files
    var moveAudio = new Audio("./sounds/move.wav");
    var sentenceCompleteAudio = new Audio("./sounds/bell.wav");
    
    // Handlebars templates
    var sentenceSource = $("#sentenceTemplate").html(); // retrieve the template data from the html
    var sentence_template = Handlebars.compile(sentenceSource); // compile the template
    $("#sentenceContainer").html(sentence_template({sentences})); // insert the HTML code into the page

    var modalSource = $("#completeTemplate").html();
    var modal_template = Handlebars.compile(modalSource);
    $("#modalContainer").html(modal_template({sentences}));

    // the big star goes on stage
    $(".eachWord").sortable({
        draggable: ".sortable",
        // filter: ".notSortable",
        dataIdAttr: "id",
        onStart: function(evt) {
            // moveAudio.play(); // it's a bit tacky
        },
        onEnd: function(evt) {
            var whichSentence = $(evt.to).data("id");
            sentences[whichSentence].currentlyLeft = this.toArray();
            var text = $("#"+sentences[whichSentence].currentlyLeft[0]).text();
            
            while ((sentences[whichSentence].sentenceInOrder[sentences[whichSentence].currentCorrectWord].localeCompare(text)) == 0) {
                $("#"+sentences[whichSentence].currentlyLeft[0]).removeClass("sortable").addClass("notSortable");
                sentences[whichSentence].currentCorrectWord++;
                sentences[whichSentence].currentlyLeft = this.toArray();
                
                // if sorting is over
                if ( sentences[whichSentence].currentlyLeft.length == 0 ) { 
                    sentences[whichSentence].complete = true;
                    $("#icon"+whichSentence).attr("src", "./images/tick.png");
                    var sentenceCompleteAudio = new Audio("./sounds/bell.wav");
                    sentenceCompleteAudio.play();
                    break; 
                }
                text = $("#"+sentences[whichSentence].currentlyLeft[0]).text();
            }

            // are all sentences sorted?
            for (var i in sentences) {
                var sorted = sentences[i].complete;
                if (!sorted) break;
            }
            // if all sorted, show modal
            if (sorted) {
                $("#completeModal").modal("show");
            }
        }
    });
}); 

// handlebars helper to show @index starting from 1
Handlebars.registerHelper('incremented', function (index) {
    return ++index;
});

