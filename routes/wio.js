const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const hbs = require('hbs')
const loadSentences = require('../public/javascripts/hbs_sentences')
const app = require('../app')
const Wio = require('../models/Wio')
const mongoose = require('mongoose')
const { checkAuthenticated } = require('../bin/passport-config')

// helper to pass sentences to the client javascript file
hbs.registerHelper('convert', data => JSON.stringify(data))
// helper to show @index starting from 1
hbs.registerHelper('incremented', index => ++index)

// index of activities route
router.get('/', async (req, res, next) => {
  let userId = null
  if (req.user) userId = req.user._id
  const options = {
    projection: { description: 1 },
    sort: { description: 1 },
  }

  try {
    const data = await Wio.find({ createdBy: userId }, null, options)
    if (data === null) throw error

    if (process.env.REACT) {
      res.json(data)
    } else {
      res.render('wio/index/index', {
        layout: 'layout',
        tabTitle: 'Round English - Words in Order',
        title: {
          main: 'Words in Order',
          subtitle: 'Index of Activities',
        },
        data,
      })
    }
  } catch (error) {
    res.render('404', {
      message: "Oops... we've had problems.",
      error,
    })
  }
})

// create new activity route
router.get('/create', checkAuthenticated, (req, res, next) => {
  // router.get('/create', (req, res, next) => {
  const scripts = [
    {
      script:
        'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.11/handlebars.min.js',
    },
    {
      script:
        'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/jquery.validate.min.js',
    },
    { script: '/javascripts/wio-create.js' },
  ]

  res.render('wio/create/create', {
    layout: 'layout',
    tabTitle: 'Round English - Words in Order - Create new game',
    title: {
      main: 'New Game',
      subtitle: 'Create new Words in Order game',
    },
    scripts,
  })
})

// add new game to the database
router.post('/submit', async (req, res) => {
  const formData = req.body
  const dbData = formatForDB(formData)
  const newGame = new Wio(dbData)
  const userId = req.user._id
  newGame.createdBy = userId
  await newGame.save()
  res.end()
})

/* game route */
router.get('/:id', async (req, res, next) => {
  // string checking
  const regex = /[A-Fa-f0-9]{24}/ //regular expression: 24 hexadecimal characters
  const id = req.params.id
  if (!regex.test(id) || id.length != 24) {
    res.render('404', {
      message: "Oops... we've had problems.",
      error: 'Not a game ID',
    })
  }
  try {
    const options = { projection: { _id: 0, title: 1, data: 1 } }
    const { title = null, data = null } = await Wio.findOne(
      { _id: id },
      null,
      options
    )
    if (title === null) throw error
    const sentences = loadSentences(data)
    if (process.env.REACT) {
      console.log(sentences)
      res.json({title, sentences})
    } else {
      res.render('wio/game/game', {
        layout: 'layout',
        tabTitle: `Round English - Words in Order - ${title.main}`,
        title,
        sentences,
      })
    }
  } catch (error) {
    res.render('404', {
      message: "Oops... we've had problems.",
      error,
    })
  }
})

module.exports = router

// function to format data received by POST in JSON to object for MongoDB
const formatForDB = formData => {
  let dbData = {
    description: formData[0].value,
    title: {
      main: formData[1].value,
      subtitle: formData[2].value,
    },
    data: [],
  }

  let j = 0
  for (let i = 3; i < formData.length; i += 2) {
    dbData.data[j] = {
      comment: formData[i].value,
      words: formData[i + 1].value,
    }
    j++
  }

  return dbData
}

const obj = {
  id: 'id',
  description: 'Some description',
  title: {
    main: 'Main title',
    subtitle: 'Subtitle',
  },
  data: [
    {
      code: 'the code',
      words: 'the words',
    },
    {
      code: 'the code',
      words: 'the words',
    },
    {
      code: 'the code',
      words: 'the words',
    },
  ],
}
