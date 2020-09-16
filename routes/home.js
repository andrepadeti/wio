const express = require('express')
const router = express.Router()
const hbs = require('hbs')

router.get('/', (req, res, next) => {
  const games = [
    { 
      game: 'Words in Order',
      url: '/wio',
    },
  ]
  
  res.render('home/home', 
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

module.exports = router