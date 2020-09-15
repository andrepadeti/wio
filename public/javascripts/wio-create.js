// document.addEventListener('DOMContentLoaded', () => {
$(document).ready(() => {
  // retrieve all template data from html
  // const tplGame = $('#tplGame').html()
  const tplSentence = $('#tplSentence').html()
   
  /* compile the templates
  const renderForm = () => {
    const tpl = Handlebars.compile(tplGame)
    $('#wio-form').append(tpl)
  }
  */

  // sentences tools
  const addSentence = (countSentences) => {
    const tpl = Handlebars.compile(tplSentence)
    const html = tpl({number: countSentences})
    $('.js-section__body').append(html)

    // add validation rule
    $(`#sentence${countSentences}`).rules('add', {
      required: true,
      messages: {
        required: 'Please enter a sentence to be unscrambled or delete this sentence box.',
      },
    })

  }

  const reorderSentence = (elem, direction) => {
    const currentSentence = $(elem).closest('.sentence__item')
    const previousSentence = currentSentence.prev()
    const nextSentence = currentSentence.next()
    
    $(currentSentence).hide()
    
    if (direction == 'up')
    {
        $(previousSentence).hide()
        $(currentSentence).insertBefore(previousSentence)
        $(previousSentence).fadeIn()
    }
    else
    {
        $(nextSentence).hide()
        $(currentSentence).insertAfter(nextSentence)
        $(nextSentence).fadeIn()
    }
    
    $(currentSentence).fadeIn()
  }
   
  const removeSentence = function(elem) {
    // remove validation rule
    $(elem).closest('.sentence__item')
      .rules('remove')

    // remove node
    $(elem).closest('.sentence__item')
      .fadeOut(function() {
        this.remove()
      })
  }
   
  const getFormData = () => {
    
    /*
    Loop through all sentence form elements, create dynamic names prepended onto current data vals
    don't need anymore, since handlebars guarantees unique name attributes
    $('.sentence__item').each((index, item) => {
      $(item).find('.sentence__comment-input').attr('name', `comment${index}`)
      $(item).find('.sentence__words-input').attr('name', `words${index}`)
    })
    */

    const formData = $("#wio-form").serializeArray()
    const formDataJSON = JSON.stringify(formData)

    return formDataJSON
  }
   
  const submitForm = async (body) => {
    const resp = await fetch('submit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      body,
    })

    // if ( resp.status >= 200 && resp.status <= 299 ) return true
  }

  const cancelForm = () => {
    console.log('cancel')
  }
   
  const attachEventListeners = () => {
    let countSentences = 1
    
    $('#wio-form').on('click', '.js-add-section', function(e) {
        e.preventDefault()
        // addSentence(this)
        addSentence(countSentences)
        countSentences++
    })
    
    $('#wio-form').on('click', '.js-section__control-up', function() {
      reorderSentence(this, 'up')
    })
    
    $('#wio-form').on('click', '.js-section__control-down', function() {
        reorderSentence(this, 'down')
    })
    
    $('#wio-form').on('click', '.js-section__control-remove', function() {
        removeSentence(this)
    })
    
    $('#wio-form').on('click', '.form-submit', e => {
        e.preventDefault()
        // check form validation
        const isValid = $("#wio-form").valid()
        if (isValid) {
          const formData = getFormData()
          submitForm(formData)
          alert('New game created!')
          window.location.href = '/wio'
        }
    })
    
    $('#wio-form').on('click', '.form-cancel', e => {
        e.preventDefault()
        cancelForm()
    })
  }
   
  $("#wio-form").validate({
    rules: {
      description: 'required',
      title: 'required',
      subtitle: 'required',
    },
    messages: {
      description: 'Please enter description to be shown in the list of available activities.',
      title: 'Please enter a title for the game.',
      subtitle: 'Please enter a subtitle for the game.',
    },
    submitHandler: function(form) {
      form.submit()
    }
  })

  const init = ({numOfStartSentences = 1} = {}) => {
    // renderForm()
    attachEventListeners()
    // start with numOfStartSentences
    for (i=0;i<numOfStartSentences;i++) $('.js-add-section').trigger('click')
  }

  init({numOfStartSentences: 2})
})