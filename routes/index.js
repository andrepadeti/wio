import express from 'express'
let router = express.Router()
import hbs from 'hbs'
import loadSentences from '../public/javascripts/hbs_sentences'
import { ObjectId } from 'mongodb'

// helper to pass sentences to the client javascript file 
hbs.registerHelper('convert', data => JSON.stringify(data))
// helper to show @index starting from 1 
hbs.registerHelper('incremented', index => ++index)

/* GET home page. */
router.get('/', (req, res, next) => {
  const db = req.app.locals.db
  const wio = db.collection('wio')
  // const query = ObjectId("5f453e2a366be112746d3a24") // git sentences
  const query = ObjectId("5f40055d0cbbae19ed988868")  // test sentences
  const options = { projection: { _id: 0, data: 1 }}
  wio.findOne(query, options)
    .then( ( { data } ) => {
      const sentences = loadSentences(data)
      res.locals = { sentences }
      res.render('index')
    })
  // res.sendFile(path.join(__dirname, '/', '../public', 'index.html'))

})

export default router