import express from 'express'
let router = express.Router()
import hbs from 'hbs'
import loadSentences from '../public/javascripts/hbs_sentences'
import { ObjectId } from 'mongodb'
import { app } from '../app'

// helper to pass sentences to the client javascript file 
hbs.registerHelper('convert', data => JSON.stringify(data))
// helper to show @index starting from 1 
hbs.registerHelper('incremented', index => ++index)

let game = {
  description: 'Description shows in the games list',
  title: {
    main: 'The main title',
    subtitle: 'The subtitle',
  },
  data: [
    {
      number: 1,
      title: 'Sentence 1',
      placeholder: { comment: 'Comment 1', sentence: 'Sentence 1' },
    }
  ]
}


// index of activities route
router.get('/', async (req, res, next) => {
	const db = req.app.locals.db
  const wio = db.collection('wio')
  const options = { 
    projection: { description: 1 }, 
    sort: { description: 1 } 
  }
  const data = await wio.find({}, options).toArray()
  res.render('wio/index', 
    { 
			layout: 'layout',
      tabTitle: 'Round English - Words in Order',
      data
		}
	)
})
	
// create new activity route
router.get('/create', (req, res, next) => {
  res.render('wio/create',
		{
			layout: 'layout',
			tabTitle: 'Round English - Words in Order - Create new game',
			title: {
				main: 'New Game',
				subtitle: 'Create new Words in Order game'
      },
      game,
		}
	)
})

// add new game to the database
router.post('/submit', async (req, res) => {
  // console.log('submit')
  // const db = req.app.locals.db
  // const wio = db.collection('wio')
	// const data = eval('(' + req.body.data + ')')
	// await wio.insertOne(data)
	res.end()
})

router.get('/add', (req, res, next) => {
  res.send(game.data.length.toString())
})

router.post('/add', (req, res) => {
  // console.log(req.body)
  
  /* for this to work, i'll need to POST the whole form back
  for (let entry in req.body) {
    if (entry === 'description') game.description = entry
    if (entry === 'title') game.title.main = entry
    if (entry === 'subtitle') game.title.subtitle = entry
  }
  */

  // update sentence object with new information
  let sentenceNumber = req.body.sentenceNumber - 1
  game.data[sentenceNumber].placeholder.comment = req.body.inputComment
  game.data[sentenceNumber].placeholder.sentence = req.body.inputSentence
  
  // create next sentence in the array
  let nextSentenceNumber = game.data.length + 1
  game.data.push(
    {
      number: nextSentenceNumber,
      title: `Sentence ${(nextSentenceNumber)}`,
      placeholder: { comment: `Comment ${(nextSentenceNumber)}`, sentence: `Sentence ${(nextSentenceNumber)}` }
    }
  )
  res.end()
  // res.redirect('back')
})
	
/* game route */
router.get('/:id', (req, res, next) => {
	// my string checking doesn't work :-p
	const regex = /[A-Fa-f0-9]{24}/ //regular expression: 12 hexadecimal characters
	const id = req.params.id
	if ( !(regex.test(id)) ) {
		console.log("no")
		next() // if not a game id, next()
	}


  const db = req.app.locals.db
  const wio = db.collection('wio')
  // const query = ObjectId("5f453e2a366be112746d3a24") // git sentences
  // const query = ObjectId("5f40055d0cbbae19ed988868")  // test sentences
  const query = ObjectId(id)  // get from the parameters
  const options = { projection: { _id: 0, title: 1, data: 1 } }
  
  wio.findOne(query).then(data => console.log(data))
  wio.findOne(query, options)
    .then( ( { title, data } ) => {
      const sentences = loadSentences(data)
      res.locals = { sentences }
      res.render('wio/game', 
        {
        	layout: 'layout',
          tabTitle: `Round English - Words in Order - ${title.main}`,
          title,
         })
    })
})

export default router

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
