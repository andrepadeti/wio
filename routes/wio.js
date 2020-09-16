const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const hbs = require('hbs')
const loadSentences = require('../public/javascripts/hbs_sentences')
const ObjectId = require('mongodb').ObjectId
const app = require('../app')

// helper to pass sentences to the client javascript file 
hbs.registerHelper('convert', data => JSON.stringify(data))
// helper to show @index starting from 1 
hbs.registerHelper('incremented', index => ++index)

// function to format data received by POST in JSON to object for MongoDB
const formatForDB = (formData) => {
  let dbData = {
      description: formData[0].value,
      title: {
          main: formData[1].value,
          subtitle: formData[2].value,
      },
      data: [],
  }

  let j = 0
  for (let i=3; i < formData.length; i+=2) {
      dbData.data[j] = {comment: formData[i].value, words: formData[i+1].value}
      j++
  }
  
  return dbData
}

// index of activities route
router.get('/', async (req, res, next) => {
	const db = req.app.locals.db
  const wio = db.collection('wio')
  const options = { 
    projection: { description: 1 }, 
    sort: { description: 1 } 
  }

  try {
    const data = await wio.find({}, options).toArray()
    if (data === null) throw error
    res.render('wio/index/index', { 
        layout: 'layout',
        tabTitle: 'Round English - Words in Order',
        data
      })
  } catch (error) {
    res.render('404', { 
      message: "Oops... we've had problems.",
      error,
    })
  }
})
	
// create new activity route
router.get('/create', (req, res, next) => {
  res.render('wio/create/create',
		{
			layout: 'layout',
			tabTitle: 'Round English - Words in Order - Create new game',
			title: {
				main: 'New Game',
				subtitle: 'Create new Words in Order game'
      },
		}
	)
})

// add new game to the database
router.post('/submit', async (req, res) => {
  const db = req.app.locals.db
  const wio = db.collection('wio')
  
  const formData = req.body
  const dbData = formatForDB(formData)

  // await wio.insertOne(dbData)
  res.end()
})

/* game route */
router.get('/:id', async (req, res, next) => {
	// my string checking doesn't work :-p
	const regex = /[A-Fa-f0-9]{24}/ //regular expression: 24 hexadecimal characters
	const id = req.params.id
	if ( !(regex.test(id)) || (id.length != 24) ) {
    console.log("no")
    res.render('404', { 
      message: "Oops... we've had problems.",
      error: 'Not a game ID',
    })
  }


  const db = req.app.locals.db
  const wio = db.collection('wio')
  const query = ObjectId(id)  // get from the parameters
  const options = { projection: { _id: 0, title: 1, data: 1 } }
  
  try {
    const { title = null, data = null } = await wio.findOne(query, options)
    if (title === null) throw error
    const sentences = loadSentences(data)
    // res.locals = { sentences }
    res.render('wio/game/game', {
      layout: 'layout',
      tabTitle: `Round English - Words in Order - ${title.main}`,
      title,
      sentences,
    })
  } catch (error) {
    res.render('404', { 
      message: "Oops... we've had problems.",
      error,
    })
  }
})

module.exports = router

const obj =
  { id: 'id',
    description: 'Some description',
    title: {
        main: 'Main title', 
        subtitle: 'Subtitle' 
      },
    data: [
      { 
				code: 'the code', 
				words: 'the words' 
			},
			{ 
				code: 'the code', 
				words: 'the words' 
			},
			{ 
				code: 'the code', 
				words: 'the words' 
			},
    ]
  }
