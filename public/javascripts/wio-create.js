// document.addEventListener('DOMContentLoaded', () => {
$(document).ready(() => {
  // retrieve all template data from html
  const tplGame = $('#tplGame').html()
  const tplSentence = $('#tplSentence').html()
   
  // compile the templates
  const renderForm = () => {
    const tpl = Handlebars.compile(tplGame)
    $('#wio-form').append(tpl)
  }
   
   // sentences tools
   const addSentence = (elem) => {
      const tpl = Handlebars.compile(tplSentence)
      $('.js-section__body').append(tpl)
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
    $(elem).closest('.sentence__item')
        .fadeOut(function() {
          this.remove()
        })
  }
   
  const getFormData = () => {
      
    // Loop through all sentence form elements, create dynamic names prepended onto current data vals
    $('.sentence__item').each((index, item) => {
      $(item).find('.sentence__comment-input').attr('name', `comment${index}`)
      $(item).find('.sentence__words-input').attr('name', `words${index}`)
    })

    const formData = $("#wio-form").serializeArray()
    const formDataJSON = JSON.stringify(formData)

    /* this implementation gets rid of {'name': 'xxx', 'value':'xxx'}
    ** i'm not using it
    var result = { };
    $.each($('form').serializeArray(), function() {
      result[this.name] = this.value;
    });
    */
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
    $('#wio-form').on('click', '.js-add-section', function(e) {
        e.preventDefault()
        addSentence(this)
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
        const formData = getFormData()
        submitForm(formData)
        alert('New game created!')
        window.location.href = '/wio'
    })
    
    $('#wio-form').on('click', '.form-cancel', e => {
        e.preventDefault()
        cancelForm()
    })
  }
   
  const init = ({numOfStartSentences = 1} = {}) => {
    renderForm()
    attachEventListeners()
    // start with numOfStartSentences
    for (i=0;i<numOfStartSentences;i++) $('.js-add-section').trigger('click')
  }

  init({numOfStartSentences: 1})
})