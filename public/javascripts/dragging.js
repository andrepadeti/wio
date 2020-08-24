document.addEventListener('DOMContentLoaded', async () => {

  // future implementation of query string parameters
  // https://www.sitepoint.com/get-url-parameters-with-javascript/
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const exercise = urlParams.get('ex')
  // console.log(exercise)

  // Object holding the sentences to be shown 
  var sentences = loadSentences([
    { code: 'The first sentence.', words: 'The first sentence.'},
    { code: 'The second sentence.', words: 'The second sentence.'},
    // { code: 'git add <filename>', words: 'Add files to the INDEX.' },
    // { code: "git commit -m 'commit message'", words: 'Commit the changes to the HEAD.' },
    // { code: 'git push origin master', words: 'Send the changes to the remote repository.' },
    // { code: 'git branch feature_x', words: "Create a new branch named 'feature_x'."},
    // { code: 'git merge feature_x', words: "Merge branch named 'feature_x' into your active branch." },
  ])

  // the audio files
  // the bell audio object is instantiated each time a sentence is completed, in case
  // the student is too fast and completes the next sentence before the audio finishes playing
  const moveAudio = new Audio('./sounds/move.wav')
  
  // Handlebars templates
  var sentenceSource = document.getElementById('sentenceTemplate').innerHTML // retrieve the template data from the html
  var sentence_template = Handlebars.compile(sentenceSource) // compile the template
  document.getElementById('sentenceContainer').innerHTML = sentence_template({sentences}) // insert the HTML code into the page

  var modalSource = document.getElementById('completeTemplate').innerHTML
  var modal_template = Handlebars.compile(modalSource)
  // the following line doesn't work, so I had to use jQuery
  // document.getElementById('modalContainer').innerHtml = modal_template({sentences})
  $("#modalContainer").html(modal_template({sentences}));

  /**
   * @description Function to check whether all sentences have already been sorted
   * @function sentenceCompleted
   * @param {number} id 
   */
  const sentenceCompleted = id => {
    sentences[id].complete = true
    
    // are all sentences sorted?
    for (var i in sentences) {
      var sorted = sentences[i].complete
      if (!sorted) break
    }

    // if all sorted, show modal
    if (sorted) {
      $('#completeModal').modal('show')
      // the following replaces the above in Bootstrap 5
      // const modal = new bootstrap.Modal(document.getElementById('completeModal'))
      // const modal = new bootstrap.Modal(document.querySelector('#completeModal'))
      // modal.show()
    }
  }
  
  // make each sentence sortable
  sentences.forEach(
    ({ 
      id, 
      sentenceInOrder, 
      currentCorrectWord, 
      currentlyLeft, 
      complete 
    }) => {

    const el = document.getElementById('sort' + id)
    Sortable.create(el, {
      draggable: '.sortable',
      dataIdAttr: 'id',
      onStart: function(evt) {
        // moveAudio.play() // it's a bit tacky
      },
      onEnd: function(evt) {
        currentlyLeft = this.toArray()
        let text = document.getElementById(currentlyLeft[0]).textContent
        
        // keep marking words sorted until the next one is out of order.
        while ((sentenceInOrder[currentCorrectWord].localeCompare(text)) == 0) {
          // change css class of elements already in order
          let el = document.getElementById(currentlyLeft[0])
          el.classList.remove('sortable')
          el.classList.add('notSortable')
          
          currentCorrectWord++
          currentlyLeft = this.toArray()
          
          // if sorting is over
          if ( currentlyLeft.length == 0 ) { 
            complete = true
            document.getElementById('icon'+id).src='./images/tick.png'
            const sentenceCompleteAudio = new Audio('./sounds/bell.wav')
            sentenceCompleteAudio.volume = 0.1
            sentenceCompleteAudio.play()
            sentenceCompleted(id) 
            break
          }
          text = document.getElementById(currentlyLeft[0]).textContent
        }

        
      }
    })
  })
})
    
// handlebars helper to show @index starting from 1
Handlebars.registerHelper('incremented', index => ++index)