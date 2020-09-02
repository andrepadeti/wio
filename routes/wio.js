import express from 'express'
let router = express.Router()
import hbs from 'hbs'
import loadSentences from '../public/javascripts/hbs_sentences'
import { ObjectId } from 'mongodb'

// helper to pass sentences to the client javascript file 
hbs.registerHelper('convert', data => JSON.stringify(data))
// helper to show @index starting from 1 
hbs.registerHelper('incremented', index => ++index)


router.get('/', async (req, res, next) => {
  const db = req.app.locals.db
  const wio = db.collection('wio')
  const options = { 
    projection: { description: 1 }, 
    sort: { description: 1 } 
  }
  const data = await wio.find({}, options).toArray()
  res.render('wio/index-layout', { data })
})


/* Words in Order game route. */
router.get('/:id', (req, res, next) => {
  const id = req.params.id
  const db = req.app.locals.db
  const wio = db.collection('wio')
  // const query = ObjectId("5f453e2a366be112746d3a24") // git sentences
  // const query = ObjectId("5f40055d0cbbae19ed988868")  // test sentences
  const query = ObjectId(id)  // get from the parameters
  const options = { projection: { _id: 0, title: 1, data: 1 } }
  
  // wio.findOne(query).then( ({ title, data }) => console.log(title) )

  wio.findOne(query, options)
    .then( ( { title, data } ) => {
      const sentences = loadSentences(data)
      res.locals = { sentences }
      res.render('wio/game-layout', { title })
    })
  // res.sendFile(path.join(__dirname, '/', '../public', 'index.html'))

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
      { code: 'the code' },
      { words: 'the words' },
    ]}
