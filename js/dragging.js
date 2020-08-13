$(document).ready( function() {

    // future implementation of query string parameters
    // https://www.sitepoint.com/get-url-parameters-with-javascript/
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const exercise = urlParams.get("ex");
    // console.log(exercise);

    // real sentences. Too long for testing.
    // var sentences = loadSentences([
    //   { code: "git add <filename>", words: "Add files to the INDEX." },
    //   { code: 'git commit -m "commit message"', words: "Commit the changes to the HEAD." },
    //   { code: "git push origin master", words: "Send the changes to the remote repository." },
    //   { code: "git branch feature_x", words: 'Create a new branch named "feature_x".'},
    //   { code: "git merge feature_x", words: 'Merge branch named "feature_x" into your active branch.' },
    // ]);

    // simpler sentences for testing only
    var sentences = loadSentences([
      { code: "The first sentence.", words: "The first sentence." },
      { code: "The second sentence.", words: "The second sentence." },
      // { code: "git push origin master", words: "Yet another sentence." },
    ]);

    // the audio files
    // the bell audio object is instantiated each time a sentence is completed, in case
    // the student is too fast and completes the next sentence before the audio finishes playing
    const moveAudio = new Audio("./sounds/move.wav");
    
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
            
            // keep marking words sorted until the next one is out of order.
            while ((sentences[whichSentence].sentenceInOrder[sentences[whichSentence].currentCorrectWord].localeCompare(text)) == 0) {
                $("#"+sentences[whichSentence].currentlyLeft[0]).removeClass("sortable").addClass("notSortable");
                sentences[whichSentence].currentCorrectWord++;
                sentences[whichSentence].currentlyLeft = this.toArray();
                
                // if sorting is over
                if ( sentences[whichSentence].currentlyLeft.length == 0 ) { 
                    sentences[whichSentence].complete = true;
                    $("#icon"+whichSentence).attr("src", "./images/tick.png");
                    const sentenceCompleteAudio = new Audio("./sounds/bell.wav");
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
            if (sorted) $("#completeModal").modal("show");
        }
    });
}); 

// handlebars helper to show @index starting from 1
Handlebars.registerHelper('incremented', index => ++index);

