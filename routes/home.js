import express from 'express'
let router = express.Router()
import hbs from 'hbs'

router.get('/', (req, res, next) => {
  const games = [
    { 
      game: 'Words in Order',
      url: '/wio',
    },
  ]
  
  res.render('home', 
    { 
      layout: 'layout',
      tabTitle: 'Round English - Home',
      title: { 
        main: 'ELT Games',
        subtitle: 'A collection of ELT Games',
      },
      games,
    })
  // res.sendFile(path.join(__dirname, '/', '../public', 'index.html'))

})

export default router