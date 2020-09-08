document.addEventListener('DOMContentLoaded', () => {

  // the audio files
  // the bell audio object is instantiated each time a sentence is completed, in case
  // the student is too fast and completes the next sentence before the audio finishes playing
  const moveAudio = new Audio('../sounds/move.wav')
  
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
      // function to handle click or touch to close modal
      const handleClickOrTouch = (e) => {
        e.preventDefault()
        modal.style.display = 'none'
      }
      
      const modal = document.getElementById('completeModal')
      modal.style.display = 'block'
      
      // focus on the close button
      const closeButton = document.getElementById('close-button')
      closeButton.focus()
      
      // close modal if click or touch on button
      closeButton.addEventListener('click', handleClickOrTouch)
      closeButton.addEventListener('touchstart', handleClickOrTouch)
      
      // close modal if click anywhere outside the modal
      window.addEventListener('click', handleClickOrTouch)
      window.addEventListener('touchstart', handleClickOrTouch)
      
      // close modal if press escape
      modal.onkeydown = (e) => {
        if (e.key = 'Escape') modal.style.display = 'none'
      }
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
          let elem = document.getElementById(currentlyLeft[0])
          elem.classList.remove('sortable')
          elem.classList.add('notSortable')
          
          currentCorrectWord++
          currentlyLeft = this.toArray()
          
          // if sorting is over
          if ( currentlyLeft.length == 0 ) { 
            complete = true
            document.getElementById('icon'+id).src='../images/tick.png'
            const sentenceCompleteAudio = new Audio('../sounds/bell.wav')
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