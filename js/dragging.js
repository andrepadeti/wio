
$(document).ready( function() {

    // future implementation of query string parameters
    // https://www.sitepoint.com/get-url-parameters-with-javascript/
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString);
    const exercise = urlParams.get("ex");
    console.log(exercise);
    
    class Sentence {
        constructor(sentence) {
            this.text = sentence;
            this.sentenceInOrder = []; // array that stores the split sentence
            this.sentenceShuffled = []; // array that stores the shuffled sentence
            this.currentCorrectWord = 0; // stores how many words are correct already while student is sorting
            this.currentlyLeft = []; // array that stores the words still left to be sorted
            this.complete = false; // becames true when sentence is sorted
        }
    }

    sentence1 = new Sentence("The first sentence.");
    sentence2 = new Sentence("The second sentence.");
    sentence3 = new Sentence("Yet another sentence.");

    var data = { sentences: [sentence1, sentence2, sentence3]};

    // the audio files
    var moveAudio = new Audio("./sounds/move.wav");
    var sentenceCompleteAudio = new Audio("./sounds/bell.wav");
    
    // Handlebars templates
    var sentenceSource = $("#sentenceTemplate").html(); // retrieve the template data from the html
    var sentence_template = Handlebars.compile(sentenceSource); // compile the template

    var modalSource = $("#completeTemplate").html();
    var modal_template = Handlebars.compile(modalSource);
    $("#modalContainer").html(modal_template(data));

    // prepare each sentence to show
    for (var i in data.sentences) {
        data.sentences[i].sentenceInOrder = data.sentences[i].text.split(" "); // split the sentence and store in an array
        data.sentences[i].sentenceShuffled = data.sentences[i].sentenceInOrder.slice(); // make a copy of the array

        // make sure the first word in the array is not the same first word in the sentence
        auxArray = data.sentences[i].sentenceShuffled.slice();
        do {
            shuffleWords(auxArray);
        } while (( auxArray[0].localeCompare(data.sentences[i].sentenceInOrder[0]) ) == 0 );
        data.sentences[i].sentenceShuffled = auxArray.slice();
        data.sentences[i].currentCorrectWord = 0; // when the student is sorting the sentence
    }
    
    $("#sentenceContainer").html(sentence_template(data)); // insert the HTML code into the page

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
            data.sentences[whichSentence].currentlyLeft = this.toArray();
            var text = $("#"+data.sentences[whichSentence].currentlyLeft[0]).text();
            
            while ((data.sentences[whichSentence].sentenceInOrder[data.sentences[whichSentence].currentCorrectWord].localeCompare(text)) == 0) {
                $("#"+data.sentences[whichSentence].currentlyLeft[0]).removeClass("sortable").addClass("notSortable");
                data.sentences[whichSentence].currentCorrectWord++;
                data.sentences[whichSentence].currentlyLeft = this.toArray();
                
                // if sorting is over
                if ( data.sentences[whichSentence].currentlyLeft.length == 0 ) { 
                    data.sentences[whichSentence].complete = true;
                    $("#icon"+whichSentence).attr("src", "./images/tick.png");
                    var sentenceCompleteAudio = new Audio("./sounds/bell.wav");
                    sentenceCompleteAudio.play();
                    break; 
                }
                text = $("#"+data.sentences[whichSentence].currentlyLeft[0]).text();
            }

            // are all sentences sorted?
            for (var i in data.sentences) {
                var sorted = data.sentences[i].complete;
                console.log(sorted);
                if (!sorted) break;
            }
            // if all sorted, show modal
            if (sorted) {
                $("#completeModal").modal("show");
            }
        }
    });
}); 

// function to shuffle words in a sentence
function shuffleWords(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// handlebars helper to show @index starting from 1
Handlebars.registerHelper('incremented', function (index) {
    return ++index;
});

