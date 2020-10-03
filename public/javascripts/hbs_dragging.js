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
      $('#completeModal').modal('show')
      $('#backButton').on('click', () => {
        window.location.href = '/wio'
      })
      $('#playAgainButton').on('click', () => {
        window.location.reload()
      })
    }
  }

  // make each sentence sortable
  sentences.forEach(
    ({ id, sentenceInOrder, currentCorrectWord, currentlyLeft, complete }) => {
      const el = document.getElementById('sort' + id)
      Sortable.create(el, {
        draggable: '.sortable',
        dataIdAttr: 'id',
        onStart: function (evt) {
          // moveAudio.play() // it's a bit tacky
        },
        onEnd: function (evt) {
          currentlyLeft = this.toArray()
          let text = document.getElementById(currentlyLeft[0]).textContent

          // keep marking words sorted until the next one is out of order.
          while (sentenceInOrder[currentCorrectWord].localeCompare(text) == 0) {
            // change css class of elements already in order
            let elem = document.getElementById(currentlyLeft[0])
            elem.classList.remove('sortable')
            elem.classList.add('notSortable')

            currentCorrectWord++
            currentlyLeft = this.toArray()

            // if sorting is over
            if (currentlyLeft.length == 0) {
              complete = true
              document.getElementById('icon' + id).src = '../images/tick.png'
              const sentenceCompleteAudio = new Audio('../sounds/bell.wav')
              sentenceCompleteAudio.volume = 0.1
              sentenceCompleteAudio.play()
              sentenceCompleted(id)
              break
            }
            text = document.getElementById(currentlyLeft[0]).textContent
          }
        },
      })
    }
  )
})
